import express from "express";

import {
  createUser,
  getUser,
  signInUser,
  signOut,
} from "../controller/userController";
import {
  authenticateToken,
  destroyAccessToken,
} from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - last_login
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         last_login:
 *           type: DateTime
 *         created_at:
 *           type: DateTime
 *         updated_at:
 *           type: DateTime
 *       example:
 *         email: abcxyz
 *         password: abc
 *   securitySchemes:
 *     myAuth:
 *       type: "apiKey"
 *       description: "Value for the Authorization header parameter"
 *       name: "Authorization"
 *       in: "header"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User API  
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exits
 *       500:
 *         description: Internal Server Error 
 */
router.route("/create").post(createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Returns token for authorized User
 *     tags: [Users]
 *     content:
 *       - application/json:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: successful login
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       403:
 *         description: Invalid password
 *       404:
 *         description: User does't exits
 *       500:
 *         description: Internal Server Error
 */
router.route("/login").post(signInUser);

/**
 * @swagger
 * paths:
 *   /user/{id}:
 *     get:
 *       summary: Returns user List By ID 
 *       tags: [Users]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID for Get User
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - myAuth: []
 *       responses:
 *         200:
 *           description: Success.
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         500:
 *           description: Internal Server Error
 *        
 */
router.route("/:id").get(authenticateToken,getUser);


export default router;
