import express from 'express';
import { Router } from "express";
import {
  createStageTemplate,
  getAllStageTemplate,
  deleteStageTemplate,
  getStageTemplate,
  updateStageTemplate,
  deleteStageTemplates
} from "../controller/stageTemplateController";
import { authenticateToken } from "../middleware/authMiddleware";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     StageTemplate:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - json_data
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         json_data:
 *           type: json
 *         created_at:
 *           type: DateTime
 *       example:
 *         name: "name"
 *         type: "type"
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
 *   name: StageTemplates
 *   description: StageTemplates API
 */

/**
 * @swagger
 * paths:
 *   /stagetemplate/list:
 *     get:
 *       summary: Return list of StageTemplate
 *       tags: [StageTemplates]
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/StageTemplate'
 *         500:
 *           description: Internal Server Error
 */
router.route("/list").get(authenticateToken, getAllStageTemplate);

/**
 * @swagger
 * paths:
 *   /stagetemplate/get/{id}:
 *     get:
 *       summary: get stageTemplate by ID
 *       tags: [StageTemplates]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID for Get StageTemplate
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/StageTemplate'
 *         500:
 *           description: Internal Server Error
 */
router.route("/get/:id").get(authenticateToken, getStageTemplate);

/**
 * @swagger:
 * paths:
 *   /stagetemplate/create:
 *      post:
 *        summary: create new StageTemplate
 *        tags: [StageTemplates]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StageTemplate'
 *        security:
 *         - myAuth: []
 *        responses:
 *          200:
 *            description: StageTemplate created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/StageTemplate'
 *          500:
 *            description: Internal Server Error
 */
router.route("/create").post(authenticateToken, createStageTemplate);

/**
 * @swagger
 * paths:
 *   /stagetemplate/update/{id}:
 *      put:
 *        summary: Update StageTemplate by ID
 *        tags: [StageTemplates]
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
 *                $ref: '#/components/schemas/StageTemplate'
 *        security:
 *          - myAuth: []
 *        responses:
 *          200:
 *            description: StageTemplate was updated
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/StageTemplate'
 *          500:
 *            description: internal server error
 */
router.route("/update/:id").put(authenticateToken, updateStageTemplate);

/**
 * @swagger
 * paths:
 *   /stagetemplate/delete/{id}:
 *      delete:
 *        summary: Delete StageTemplate by ID
 *        tags: [StageTemplates]
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
 *            description: StageTemplate deleted
 *          500:
 *            description: Internal server error
 */
router.route("/delete/:id").delete(authenticateToken, deleteStageTemplate);

/**
 * @swagger
 * paths:
 *   /stagetemplate/delete/many:
 *      post:
 *        summary: Delete StageTemplates
 *        tags: [StageTemplates]
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
 *            description: StageTemplate deleted
 *          400:
 *            description: ID not provided
 *          500:
 *            description: Internal server error
 *
 */
router.route("/delete/many").post(authenticateToken, deleteStageTemplates);


export default router;
