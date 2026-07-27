import { Router } from "express";
import {
    addBook,
    getBook,
    editBook,
    deleteBook,
    assignBook,
    getAllBooks,
} from "../controller/book.controller.js";

import {
    assignToUser,
    getAllAssignedBooks,
    removeAssignedUser
} from "../controller/assignBook.controller.js";

import JWT_MID from "../middleware/JWT.middleware.js";

const router = Router();

router.use(JWT_MID);

router.route("/addBook").post(addBook);
router.route("/getBook/:BookId").get(getBook);
router.route("/editBook/:BookId").post(editBook);
router.route("/assignBook/:BookId").patch(assignBook);
router.route("/deleteBook/:BookId").post(deleteBook);
router.route("/allBooks").get(getAllBooks);


//assign section 

router.route("/assignBook").post(assignToUser);
router.route("/allAssignBooks").get(getAllAssignedBooks);
router.route("/removeAssignedUser/:id").delete(removeAssignedUser);

export default router;


