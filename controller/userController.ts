import { PrismaClient } from '@prisma/client'
// import axios from "axios";
import { error } from "console";
import express, { Express, Request, Response } from "express";
import { request } from "http";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
import {
  authenticateToken,
  generateAccessToken,
  destroyAccessToken,
} from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const checkUser = await prisma.wb_user.count({
      where: { email: req.body.email },
    });
    if (checkUser === 0) {
      var hashedPassword = bcrypt.hashSync(
        req.body.password,
        Number(process.env.SALT)
      );
      const user: any = await prisma.wb_user.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          last_login: new Date(),
          created_at: new Date(),
        },
      });
      // console.log("user", user);
      let tokenGenerator = {
        id: user.id,
        email: user.email,
        name: user.first_name,
      };
      var token = generateAccessToken(tokenGenerator);
      let data = {
        user_id: user.id,
        token: token,
      };
      console.log(data);
      res.status(200).send({ auth: true, data: data });
    } else {
      res.status(400).json({
        success: false,
        message: "User Already Exits..",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const signInUser = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    let user: any = await prisma.wb_user.findFirst({
      where: { email: email },
    });

    if (user !== null) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        let tokenGenerator = {
          id: user.id,
          email: user.email,
          name: user.first_name,
        };
        var token = generateAccessToken(tokenGenerator);
        let data = {
          user_id: user.id,
          token: token,
        };
        let updateLastLogin = await prisma.wb_user.update({
          where: {
            id: user.id,
          },
          data: {
            last_login: new Date(),
          },
        });
        res.status(200).json({
          success: true,
          data: data,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  await jwt.destroy(req.headers["x-access-token"]);
  res.status(200).json({
    success: true,
    message: "User logged out",
  });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    var { id } = req.params;
    let user = await prisma.wb_user.findFirst({
      where: {
        id: Number(id),
      },
    });
    let object = {
      user: user,
    };
    res.status(200).send(object);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

