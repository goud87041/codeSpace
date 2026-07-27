import { Router } from "express";
import {
    userLogin,
    registerUser,
} from "../controller/auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);



export default router;

