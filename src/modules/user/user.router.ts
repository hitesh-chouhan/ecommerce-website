import express from "express";
import { register, login } from "./user.controller";

const router = express.Router();

router.post('/register', register)  //router for user registration or signup
router.post('/login', login)  //router for user registration or signup

export default router
