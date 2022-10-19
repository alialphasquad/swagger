import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { error } from "console";
import express, { Express, Request, Response } from "express";
import { request } from "http";
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


export function generateAccessToken(username: any) {
    try {
        return jwt.sign(username, process.env.SECRET, { expiresIn: '2hrs' });
    } catch (error) {
        return error
    }

}

export function destroyAccessToken(req: Request, res: Response, next: any) {
    try {
        const token = req.headers['authorization']
        //   const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.status(401)

        console.log(token)

        jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
            console.log('err', err)
            if (err) {
                console.log(err)
                return res.status(403).send('Token Failed');;
            }

            jwt.destroy(token);
            next()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }


}

export function authenticateToken(req: Request, res: Response, next: any) {
    try {
        let token = req.headers['authorization']
        //    token = token && token.split(' ')[1]
        if (token == null) return res.status(401).send('Token NOT PROVIDED');

        jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
            // console.log('err', err)
            if (err) {
                // return res.sendStatus(403);

                return res.status(403).send('Token Failed');
            }

            req.body.user = user

            next()
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}