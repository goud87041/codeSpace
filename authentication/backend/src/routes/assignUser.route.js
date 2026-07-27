import { Router } from "express";
import {
    assignToUser, getAssignedUsers, removeAssignedUser
} from "../controller/assignUser.controller.js";

import JWT_MID from "../middleware/JWT.middleware.js";

const router = Router();

router.use(JWT_MID);


router.route("/addAssignUser").post(assignToUser);
router.route("/allAssignUser").get(getAssignedUsers);
router.route("/removeUser/:id").delete(removeAssignedUser);
// router.route("/editUser/:id").patch(JWT_MID, editUser);

// fix: profile route should be GET not POST and must come after static routes
// router.route("/:userId").get(JWT_MID, getUserProfile);

export default router ;