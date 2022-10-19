import { PrismaClient } from '@prisma/client'
import express, { Express, Request, Response } from "express";
// import {
//   workflows_templates,
//   parent_tasks,
//   wb_task_table,
// } from "../../config/workflow/wb_mappings.json";
// import { importWorkflows } from "./wbSyncController";

const prisma = new PrismaClient()
var date = new Date();

export const createWorkflow = async (req: Request, res: Response) => {
  try {
    const {
      workflow_name,
      workflow_description,
      workflow_type,
      integration_type,
    } = req.body;
    const workFlow = await prisma.wb_workflow.create({
      data: {
        workflow_name: workflow_name,
        workflow_description: workflow_description,
        workflow_type: workflow_type,
        integration_type: integration_type,
        created_at: date,
        updated_at: date,
      },
    });
    // importWorkflows(workFlow);

    if (workFlow) {
      res.status(200).json({
        success: true,
        data: workFlow,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getWorkflowById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workFlow = await prisma.wb_workflow.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (workFlow) {
      res.status(200).json({
        success: true,
        data: workFlow,
      });
    } else {
      res.status(400).json({
        message: "ID Doesn't Exists.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getWorkflows = async (req: Request, res: Response) => {
  try {
    var workFlow:any = await prisma.wb_workflow.findMany();
    // workFlow.forEach(async (ele: any) =>
    for (let ele of workFlow) {
      ele.task_count = await prisma.wb_task.count({
        where: {
          workflow_id: ele.id
        }
      })
      ele.stage_count = await prisma.wb_stage.count({
        where: {
          workflow_id: ele.id,
        },
      });
    }
    console.log(workFlow);
    res.status(200).json({
      success: true,
      data: workFlow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateWorkflow = async (req: Request, res: Response) => {
  try {
    const {
      workflow_name,
      workflow_description,
      workflow_type,
      integration_type,
      updated_at,
    } = req.body;
    const { id } = req.params;
    const workFlow = await prisma.wb_workflow.update({
      where: {
        id: Number(id),
      },
      data: {
        workflow_name: workflow_name,
        workflow_description: workflow_description,
        workflow_type: workflow_type,
        integration_type: integration_type,
        updated_at: date,
      },
    });
    if (workFlow) {
      res.status(200).json({
        success: true,
        data: workFlow,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteWorkflow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.wb_workflow.delete({
      where: {
        id: Number(id),
      },
    });
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Workflow deleted.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteWorkflows = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id !== null && id.length !== 0) {
      const deleted = await prisma.wb_workflow.deleteMany({
        where: {
          id: {
            in: id,
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Workflows Deleted.",
      });
    } else {
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

// export const getWorkflowTemplates = async (req: Request, res: Response) => {
//   try {
//     let { key } = req.params;
//     let templates = Object.keys(
//       workflows_templates[key as keyof typeof workflows_templates]
//     );

//     res.status(200).json({
//       success: true,
//       data: templates,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

export const updateWorkflowOrder = async (req: Request, res: Response) => {
  try {
    const { workflows } = req.body;
    for (let id of workflows) {
      const updated = await prisma.wb_workflow.update({
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
