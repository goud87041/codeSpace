import { Router } from "express";
import {
    addBook,
    getBook,
    editBook,
    deleteBook,
    assignBook,
    getAllBooks,
} from "../controller/book.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.use(JWT_MID);

router.route("/addBook").post(addBook);
router.route("/getBook/:BookId").get(getBook);
router.route("/editBook/:BookId").post(editBook);
router.route("/assignBook/:BookId").patch(assignBook);
router.route("/deleteBook/:BookId").post(deleteBook);
router.route("/allBooks").get(getAllBooks);

export default router;
