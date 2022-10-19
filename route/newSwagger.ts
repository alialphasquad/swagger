import express from "express";
import {
  parentTaskList,
  createParentTask,
} from "../controller/parentTaskController";
import { authenticateToken } from "../middleware/authMiddleware";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ParentTask2:
 *       type: object
 *       required:
 *         - name
 *         - workflow_id
 *       properties:
 *         id:
 *           type: integer
 *         workflow_id:
 *           type: integer
 *       example:
 *         name: "name"
 *         workflow_id: 1
 *       securitySchemes:
 *         myAuth:
 *           type: "apiKey"
 *           description: "Value for the Authorization header parameter"
 *           name: "Authorization"
 *           in: "header"
 */

/**
 * @swagger
 * tags:
 *   name: ParentTasks2
 *   description: Parent Task API
 */

/**
 * @swagger
 * paths:
 *   /parenttask/list:
 *     get:
 *       summary: Return parent task list by workflow_id
 *       tags: [ParentTasks2]
 *       parameters:
 *         - name: workflow_id
 *           in: query
 *           description: ID for get Parent task
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/ParentTask2'
 *         500:
 *           description: Internal Server Error
 */
router.route("/list").get(authenticateToken,parentTaskList);

/**
 * @swagger:
 * paths:
 *   /parenttask/create:
 *      post:
 *        summary: create new parent task
 *        tags: [ParentTasks2]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ParentTask2'
 *        security:
 *         - myAuth: []
 *        responses:
 *          200:
 *            description: Parent Task created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ParentTask2'
 *          500:
 *            description: Internal Server Error
 */
router.route("/create").post(authenticateToken,createParentTask);

export default router;