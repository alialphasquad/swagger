import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

const prisma = new PrismaClient()
var date = new Date();

export const taskList = async (req: Request, res: Response) => {
  try {
    const { workflow_id } = req.params;
    const data = await prisma.wb_task.findMany({
      where: {
        workflow_id: Number(workflow_id),
      },
      orderBy: {
        order_by: "asc",
      },
    });
    console.log(data);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

export const taskByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.wb_task.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      customer_facing_name,
      qb_name,
      action_name,
      task_description,
      parent_task_id,
      customer_milestone,
      task_type,
      task_status,
      workflow_id,
      stage_id,
      action_required,
      order_by,
    } = req.body;

    const data = await prisma.wb_task.create({
      data: {
        workflow_id: workflow_id,
        stage_id: stage_id,
        customer_facing_name: customer_facing_name,
        qb_name: qb_name,
        action_name: action_name,
        action_required: action_required,
        task_description: task_description,
        parent_task_id: parent_task_id,
        customer_milestone: customer_milestone,
        task_type: task_type,
        task_status: task_status,
        created_at: date,
        date_of_completion: date,
        order_by: order_by,
      },
    });
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      workflow_id,
      stage_id,
      customer_facing_name,
      qb_name,
      action_name,
      task_description,
      parent_task_id,
      customer_milestone,
      task_type,
      task_status,
      action_required,
    } = req.body;
    const data = await prisma.wb_task.update({
      where: {
        id: Number(id),
      },
      data: {
        workflow_id: workflow_id,
        customer_facing_name: customer_facing_name,
        qb_name: qb_name,
        action_name: action_name,
        task_description: task_description,
        parent_task_id: parent_task_id,
        customer_milestone: customer_milestone,
        task_type: task_type,
        task_status: task_status,
        created_at: date,
        date_of_completion: date,
        stage_id: stage_id,
        action_required: action_required,
      },
    });
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.wb_task.delete({
      where: {
        id: Number(id),
      },
    });

    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Task deleted.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};
export const deletetasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id !== null && id.length !== 0) {
      const deleted = await prisma.wb_task.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Tasks Deleted.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "ID not provided",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateParentTask = async (req: Request, res: Response) => {
  try {
    const { id, parent_task_id } = req.body;
    if (id !== null && id.length !== 0) {
      const updated: any = await prisma.wb_task.updateMany({
        where: {
          id: {
            in: id,
          },
        },
        data: {
          parent_task_id: Number(parent_task_id),
        },
      });
      res.status(200).json({
        success: true,
        data: updated,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "ID not provided",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTaskOrder = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body;
    for (let id of tasks) {
      const updated = await prisma.wb_task.update({
        where: { id: id.id },
        data: { order_by: id.order_by },
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Order By Updated..",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
