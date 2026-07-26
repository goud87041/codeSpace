import { Router } from "express";
import {
    userLogin,
    registerUser,
    
} from "../controller/auth.controller.js";



import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);



export default router;

