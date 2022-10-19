import express, { Express, Request, Response } from "express";
import {
  workflows_templates,
  parent_tasks,
  wb_task_table,
} from "../../config/workflow/wb_mappings.json";
import {
  getQBTableId,
  getQBDataforSpecificTable,
} from "./wbQuickbasePostHelper";
const APP_ENV = process.env.APP_ENV;
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient();
export const importWorkflows = async (workflow: any) => {
  try {
    let default_parent_task = Object.entries(parent_tasks);
    let getTaskData = await getQBDataforSpecificTable(
      Object.keys(wb_task_table),
      await getQBTableId("wbTaskTableId"),
      workflow.integration_type
    );
    console.log("getTaskData in wbSyncCOntroller", getTaskData);
    for (let task of getTaskData) {
      let parent_id: any = default_parent_task.find(
        (ele) => ele[0] == task.get("Parent Task")
      );
      parent_id = parent_id[1];
      try {
        await prisma.wb_task.create({
          data: {
            qb_task_id: task.get("Record ID#"),
            workflow_id: workflow.id,
            customer_facing_name: task.get("Task Name"),
            action_name: task.get("Task Name"),
            qb_name: task.get("Task Name"),
            parent_task_id: parent_id,
            customer_milestone: task.get("Customer Portal Milestone"),
            task_type: task.get("Task Creation Type"),
            task_status: task.get("Status"),
            created_at: task.get("Date Created"),
          },
        });
      } catch (e) {
        console.log("e", e);
      }
    }
    return "Template Created";
  } catch (error) {
    return error;
  }
};
