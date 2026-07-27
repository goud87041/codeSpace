import { Router } from "express";
import {
    userLogin,
    registerUser,
    getUserProfile,
} from "../controller/auth.controller.js";

import {
    addUser,
    removeUser,
    editUser,
    allUser
} from "../controller/user.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(userLogin);

router.route("/addUser").post(JWT_MID, addUser);
router.route("/removeUser/:id").delete(JWT_MID, removeUser);
router.route("/editUser/:id").patch(JWT_MID, editUser);
router.route("/allUser").get(JWT_MID, allUser);

// fix: profile route should be GET not POST
// must be registered after the literal routes above, otherwise "/allUser" etc.
// get captured by this catch-all "/:userId" route
router.route("/:userId").get(JWT_MID, getUserProfile);

export default router;

