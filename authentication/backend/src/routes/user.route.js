import { Router } from "express";
import {
    userLogin,
    registerUser,
    getUserProfile,
} from "../controller/auth.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

// fix: profile route should be GET not POST
router.route("/:userId").get(JWT_MID, getUserProfile);

export default router;

