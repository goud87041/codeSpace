import { Router } from "express";
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller";
import JWT_MID from "../middlewere/JWT.middlewere";


const router = Router();

router.use(JWT_MID)

router.route("/addBook").post( addBook);
router.route("/editBook/:BookId").post(editBook);
router.route("/deleteBook/BookId").post(deleteBook);
router.route("/AllBooks").post(getAllBooks);

export default router ;

