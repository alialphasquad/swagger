import { Router } from "express";
import {
  getAllStages,
  createStage,
  deleteStage,
  updateStage,
  getStage,
  getStageByTaskID,
  deleteStages
} from "../controller/stageController";
import { authenticateToken } from "../middleware/authMiddleware";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Stage:
 *       type: object
 *       required:
 *         - stage_template_id
 *         - workflow_id
 *         - task_id
 *         - stage_name
 *         - stage_type
 *         - json_data
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *         stage_template_id:
 *           type: integer
 *         workflow_id:
 *           type: integer
 *         task_id:
 *           type: integer
 *         stage_name:
 *           type: string
 *         stage_type:
 *           type: string
 *         json_data:
 *           type: json
 *         created_at:
 *           type: DateTime
 *         updated_at:
 *           type: DateTime
 *       example:
 *         stage_template_id: 2
 *         workflow_id: 1
 *         task_id: 4
 *         stage_name: stageName
 *         stage_type: stageType
 *         json_data: [{"userId": 1,"id": 1,}]
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
 *   name: Stages
 *   description: Stages API
 */

/**
 * @swagger
 * paths:
 *   /stage/list/{workflow_id}:
 *     get:
 *       summary: Return stage list by workflow_id
 *       tags: [Stages]
 *       parameters:
 *         - name: workflow_id
 *           in: path
 *           description: ID for get stage
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Stage'
 *         500:
 *           description: Internal Server Error
 */
router.route("/list/:workflow_id").get(authenticateToken, getAllStages);

/**
 * @swagger
 * paths:
 *   /stage/get/{id}:
 *     get:
 *       summary: get stage by ID
 *       tags: [Stages]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID for Get Stage
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Stage'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/:id").get(authenticateToken, getStage);

/**
 * @swagger
 * paths:
 *   /stage/get/task/{task_id}:
 *     get:
 *       summary: get stage by ID
 *       tags: [Stages]
 *       parameters:
 *         - name: task_id
 *           in: path
 *           description: ID for Get Stage
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Stage'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/task/:task_id").get(authenticateToken, getStageByTaskID);

/**
 * @swagger:
 * paths:
 *   /stage/create:
 *      post:
 *        summary: create new Stage
 *        tags: [Stages]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Stage'
 *        security:
 *         - myAuth: []
 *        responses:
 *          200:
 *            description: Stage created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Stage'
 *          500:
 *            description: Internal Server Error
 */
router.route("/create").post(authenticateToken, createStage);

/**
 * @swagger
 * paths:
 *   /stage/update/{id}:
 *      put:
 *        summary: Update Stage by ID
 *        tags: [Stages]
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
 *                $ref: '#/components/schemas/Stage'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: Stage was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Stage'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authenticateToken, updateStage);

/**
 * @swagger
 * paths:
 *   /stage/delete/{id}:
 *      delete:
 *        summary: Delete Stage by ID
 *        tags: [Stages]
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
 *            description: Stage deleted
 *          500:
 *            description: Internal server error
 */
router.route("/delete/:id").delete(authenticateToken, deleteStage);

/**
 * @swagger
 * paths:
 *   /stage/delete/many:
 *      post:
 *        summary: Delete Stages
 *        tags: [Stages]
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
 *            description: Stages deleted
 *          400:
 *            description: ID not provided
 *          500:
 *            description: Internal server error
 *
 */
router.route("/delete/many").post(authenticateToken, deleteStages);
export default router;
