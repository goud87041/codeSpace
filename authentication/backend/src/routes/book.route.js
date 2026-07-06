import { Router } from "express";
import {
    addBook,
    editBook,
    deleteBook,
    getAllBooks,
} from "../controller/book.controller.js";

import JWT_MID from "../middlewere/JWT.middlewere.js";

const router = Router();

router.use(JWT_MID);

router.route("/addBook").post(addBook);
router.route("/editBook/:BookId").post(editBook);
router.route("/deleteBook/:BookId").post(deleteBook);
router.route("/allBooks").get(getAllBooks);

export default router;
