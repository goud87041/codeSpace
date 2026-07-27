import { Router } from "express";
import {
    addBook,
    editBook,
    deleteBook,
    getAllBooks,
} from "../controller/book.controller.js";

import {
    assignToUser,
    getAllAssignedBooks,
    removeAssignedUser
} from "../controller/assignBook.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.use(JWT_MID);

router.route("/addBook").post(addBook);
router.route("/editBook/:id").post(editBook);
router.route("/deleteBook/:id").delete(deleteBook);
router.route("/allBooks").get(getAllBooks);


//assign section 

router.route("/assignBook").post(assignToUser);
router.route("/allAssignBooks").get(getAllAssignedBooks);
router.route("/removeAssignedUser/:id").delete(removeAssignedUser);

export default router;


