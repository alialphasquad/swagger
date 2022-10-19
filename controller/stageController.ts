import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
var date = new Date();

export const createStage = async (req: Request, res: Response) => {
  try {
    let {
      stage_template_id,
      workflow_id,
      task_id,
      stage_name,
      stage_type,
      json_data,
    } = req.body;
    const stageData = await prisma.wb_stage.create({
      data: {
        stage_template_id,
        workflow_id,
        task_id,
        stage_name,
        stage_type,
        json_data,
        created_at: date,
        updated_at: date,
      },
    });
    if (stageData) {
      res.status(200).json({
        success: true,
        data: stageData,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllStages = async (req: Request, res: Response) => {
  try {
    const { workflow_id } = req.params;
    const stageData = await prisma.wb_stage.findMany({
      where: {
        workflow_id: Number(workflow_id),
      },
    });
    res.status(200).json({
      success: true,
      data: stageData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteStage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stageData = await prisma.wb_stage.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      message: "Stage Deleted.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getStage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stageData = await prisma.wb_stage.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      data: stageData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getStageByTaskID = async (req: Request, res: Response) => {
  const { task_id } = req.params;
  try {
    const stageData = await prisma.wb_stage.findMany({
      where: {
        task_id: Number(task_id),
      },
    });
    res.status(200).json({
      success: true,
      data: stageData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateStage = async (req: Request, res: Response) => {
  let {
    stage_template_id,
    workflow_id,
    task_id,
    stage_name,
    stage_type,
    json_data,
  } = req.body;
  let id = req.params.id;

  try {
    const stageData = await prisma.wb_stage.update({
      where: {
        id: Number(id),
      },
      data: {
        stage_template_id,
        workflow_id,
        task_id,
        stage_name,
        stage_type,
        json_data,
        updated_at: date,
      },
    });
    if (stageData) {
      res.status(200).json({
        success: true,
        data: stageData,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteStages = async (req: Request, res: Response) => {
  try {
      const { id } = req.body;
      if (id !== null && id.length !== 0) {
          const deleted = await prisma.wb_stage.deleteMany({
              where: {
                  id: {
                      in: id,
                  },
              },
          });
          res.status(200).json({
              success: true,
              message: "Stage Deleted.",
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

