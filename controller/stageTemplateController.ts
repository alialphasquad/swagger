import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { parse } from "path";
const prisma = new PrismaClient();
var date = new Date();

export const createStageTemplate = async (req: Request, res: Response) => {
  try {
    let { name, type, json_data } = req.body;
    const stageTemplateData = await prisma.wb_stage_template.create({
      data: {
        name,
        type,
        json_data,
        created_at: date,
      },
    });
    res.status(200).json({
      success: true,
      data: stageTemplateData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllStageTemplate = async (req: Request, res: Response) => {
  try {
    const stageTemplateData = await prisma.wb_stage_template.findMany();
    res.status(200).json({
      success: true,
      data: stageTemplateData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const deleteStageTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stageTemplateData = await prisma.wb_stage_template.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      data: stageTemplateData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//Find Post By ID
export const getStageTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stageTemplateData = await prisma.wb_stage_template.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      data: stageTemplateData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateStageTemplate = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let { name, type, json_data } = req.body;
    const stageTemplateData = await prisma.wb_stage_template.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        type: type,
        json_data: json_data,
      },
    });
    res.status(200).json({
      success: true,
      data: stageTemplateData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteStageTemplates = async (req: Request, res: Response) => {
  try {
      const { id } = req.body;
      if (id !== null && id.length !== 0) {
          const deleted = await prisma.wb_stage_template.deleteMany({
              where: {
                  id: {
                      in: id,
                  },
              },
          });
          res.status(200).json({
              success: true,
              message: "Stage Templates Deleted.",
          });
      }
      else {
          res.status(400).json({
              success: false,
              message: "ID not provided.",
          });
      }
  } catch (e) {
      console.log(e);
      res.status(500).json({
          message: "Internal Server Error",
      });
  }
};