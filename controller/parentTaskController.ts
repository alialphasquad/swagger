import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
var date = new Date();

export const parentTaskList = async (req: Request, res: Response) => {
  try {
    const { workflow_id } = req.query;
    let data = await prisma.wb_parent_task.findMany({
      where: {
        OR: [
          {
            workflow_id: Number(workflow_id),
          },
          {
            workflow_id: null,
          },
        ],
       
      },
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const createParentTask = async (req: Request, res: Response) => {
  try {
    const { name, workflow_id } = req.body;
    console.log(req.body)
    const ParentData = await prisma.wb_parent_task.create({
      data: {
        name: name,
        workflow_id: Number(workflow_id),
        created_at: date,
      },
    });
    console.log(ParentData)
    res.status(200).json({
          success: true,
      data: ParentData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
