import { Router } from "express";
import {
    assignToUser, getAssignedUsers, removeAssignedUser
} from "../controller/assignBook.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.route("/addUser").post(JWT_MID, assignToUser);
router.route("/allUser").get(JWT_MID, getAssignedUsers);
router.route("/removeUser/:id").delete(JWT_MID, removeAssignedUser);
// router.route("/editUser/:id").patch(JWT_MID, editUser);

// fix: profile route should be GET not POST and must come after static routes
// router.route("/:userId").get(JWT_MID, getUserProfile);

export default router ;