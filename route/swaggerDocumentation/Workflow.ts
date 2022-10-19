
import express  from "express";

import {
  createWorkflow,
  getWorkflowById,
  getWorkflows,
  updateWorkflow,
  deleteWorkflow,
  deleteWorkflows,
  // getWorkflowTemplates,
  updateWorkflowOrder,
} from "../controller/workflowController";
import {
  authenticateToken,
  destroyAccessToken,
} from "../middleware/authMiddleware";
// import {importWorkflows} from "../controller/wbSyncController"
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Workflow:
 *       type: object
 *       required:
 *         - workflow_name
 *         - workflow_description
 *         - integration_type
 *         - workflow_type
 *         - created_at
 *         - updated_at
 *         - order_by
 *       properties:
 *         id:
 *           type: integer
 *         workflow_name:
 *           type: string
 *         workflow_description:
 *           type: string
 *         integration_type:
 *           type: string
 *         workflow_type:
 *           type: string
 *         created_at:
 *           type: DateTime
 *         updated_at:
 *           type: DateTime
 *         order_by:
 *           type: string
 *       example:
 *         workflow_name: workflowName
 *         workflow_description: workflowDescription
 *         integration_type: integrationType
 *         workflow_type: workflowType
 *         order_by: 1
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
 *   name: Workflows
 *   description: Workflow API
 */

// router.route("/templates/:key").get(getWorkflowTemplates);

/**
 * @swagger
 * paths:
 *   /workflow/list:
 *     get:
 *       summary: get workflows
 *       tags: [Workflows]
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Workflow'
 *         500:
 *           description: Internal Server Error
 */
router.route("/list").get(getWorkflows);

/**
 * @swagger
 * paths:
 *   /workflow/get/{id}:
 *     get:
 *       summary: Return workflow by id
 *       tags: [Workflows]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID for get workflow
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/Workflow'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/:id").get(authenticateToken,getWorkflowById);

/**
 * @swagger:
 * paths:
 *   /workflow/create:
 *      post:
 *        summary: create new Workflow
 *        tags: [Workflows]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Workflow'
 *        security:
 *         - myAuth: []
 *        responses:
 *          200:
 *            description: Workflow created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Workflow'
 *          500:
 *            description: Internal Server Error
 */
router.route("/create").post(authenticateToken,createWorkflow);

/**
 * @swagger
 * paths:
 *   /workflow/update/{id}:
 *      put:
 *        summary: Update Workflow by ID
 *        tags: [Workflows]
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
 *                $ref: '#/components/schemas/Workflow'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: The Workflow was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Workflow'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authenticateToken,updateWorkflow);

/**
 * @swagger
 * paths:
 *   /workflow/delete/{id}:
 *      delete:
 *        summary: Delete Workflow by ID
 *        tags: [Workflows]
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
 *            description: Workflow deleted
 *          500:
 *            description: Internal server error
 */
router.route("/delete/:id").delete(authenticateToken,deleteWorkflow);

/**
 * @swagger
 * paths:
 *   /workflow/delete/many:
 *      post:
 *        summary: Delete Workflow
 *        tags: [Workflows]
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
 *            description: Workflows deleted
 *          400:
 *            description: ID not provided
 *          500:
 *            description: Internal server error
 *
 */
router.route("/delete/many").post(authenticateToken, deleteWorkflows);

/**
 * @swagger
 * paths:
 *   /workflow/update/order:
 *      post:
 *        summary: update workflows
 *        tags: [Workflows]
 *        requestBody:
 *          type: object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   workflows:
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
router.route("/update/order").post(authenticateToken, updateWorkflowOrder);



// router.route("/").get(importWorkflows);


// export default router;
export default router; 