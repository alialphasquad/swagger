import express from "express";
import {
  createTask,
  deleteTask,
  taskByID,
  taskList,
  updateTask,
  deletetasks,
  updateParentTask,
  updateTaskOrder,
} from "../controller/taskController";
import { authenticateToken } from "../middleware/authMiddleware";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - qb_task_id
 *         - workflow_id
 *         - stage_id
 *         - customer_facing_name
 *         - qb_name
 *         - action_name
 *         - task_description
 *         - parent_task_id
 *         - date_of_completion
 *         - customer_milestone
 *         - action_required
 *         - task_type
 *         - task_status
 *         - created_at
 *         - order_by
 *       properties:
 *         id:
 *           type: integer
 *         qb_task_id:
 *           type: integer
 *         workflow_id:
 *           type: integer
 *         stage_id:
 *           type: integer
 *         customer_facing_name:
 *           type: string
 *         qb_name:
 *           type: string
 *         action_name:
 *           type: string
 *         task_description:
 *           type: string
 *         parent_task_id:
 *           type: integer
 *         date_of_completion:
 *           type: DateTime
 *         customer_milestone:
 *           type: boolean
 *         action_required:
 *           type: boolean
 *         task_type:
 *           type: string
 *         task_status:
 *           type: string
 *         created_at:
 *           type: DateTime
 *         order_by:
 *           type: string
 *       example:
 *         qb_task_id: 2
 *         workflow_id: 1
 *         stage_id: 4
 *         customer_facing_name: facingName
 *         qb_name: qbName
 *         action_name: actionName
 *         task_description: taskDescription
 *         parent_task_id: 7
 *         customer_milestone: true
 *         action_required: false
 *         task_type: taskType
 *         task_status: taskStatus
 *         order_by: orderBy
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
 *   name: Tasks
 *   description: Task API
 */

/**
 * @swagger
 * paths:
 *   /task/list/{workflow_id}:
 *     get:
 *       summary: Return task list by workflow_id
 *       tags: [Tasks]
 *       parameters:
 *         - name: workflow_id
 *           in: path
 *           description: ID for get task
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *         500:
 *           description: Internal Server Error
 */
router.route("/list/:workflow_id").get(authenticateToken, taskList);

/**
 * @swagger
 * paths:
 *   /task/get/{id}:
 *     get:
 *       summary: get task by ID
 *       tags: [Tasks]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID for Get Task
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/:id").get(authenticateToken, taskByID);

/**
 * @swagger:
 * paths:
 *   /task/create:
 *      post:
 *        summary: create new Task
 *        tags: [Tasks]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 *        security:
 *         - myAuth: []
 *        responses:
 *          200:
 *            description: Task created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 *          500:
 *            description: Internal Server Error
 */
router.route("/create").post(authenticateToken, createTask);

/**
 * @swagger
 * paths:
 *   /task/update/{id}:
 *      put:
 *        summary: Update task by ID
 *        tags: [Tasks]
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: The Task was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Task'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authenticateToken, updateTask);

/**
 * @swagger
 * paths:
 *   /task/delete/{id}:
 *      delete:
 *        summary: Delete Task by ID
 *        tags: [Tasks]
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: Task deleted
 *          500:
 *            description: Internal server error
 */
router.route("/delete/:id").delete(authenticateToken, deleteTask);

/**
 * @swagger
 * paths:
 *   /task/delete/many:
 *      post:
 *        summary: Delete Tasks
 *        tags: [Tasks]
 *        requestBody:
 *          type: object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                     required: true
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: Tasks deleted
 *          400:
 *            description: ID not provided
 *          500:
 *            description: Internal server error
 *
 */
router.route("/delete/many").post(authenticateToken, deletetasks);

/**
 * @swagger
 * paths:
 *   /task/parent/update:
 *      put:
 *        summary: update parent task
 *        tags: [Tasks]
 *        requestBody:
 *          type: object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                     required: true
 *                   parent_task_id:
 *                     type: integer
 *                     required: true
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: Updated
 *          400:
 *            description: ID not provided
 *          500:
 *            description: Internal server error
 */
router.route("/parent/update").put(authenticateToken, updateParentTask);

/**
 * @swagger
 * paths:
 *   /task/update/order:
 *      post:
 *        summary: update order_by
 *        tags: [Tasks]
 *        requestBody:
 *          type: object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   tasks:
 *                     type: object
 *                     required: true
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: order_by updated
 *          500:
 *            description: Internal server error
 */
router.route("/update/order").post(authenticateToken, updateTaskOrder);

export default router;
