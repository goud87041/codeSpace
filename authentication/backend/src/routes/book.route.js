import { Router } from "express";
<<<<<<< HEAD
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller.js";
import JWT_MID from "../middlewere/JWT.middlewere.js";
=======
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller";
import JWT_MID from "../middlewere/JWT.middlewere";
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)


const router = Router();

router.use(JWT_MID)

<<<<<<< HEAD
router.route("/addBook").post(addBook);
=======
router.route("/addBook").post( addBook);
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
router.route("/editBook/:BookId").post(editBook);
router.route("/deleteBook/BookId").post(deleteBook);
router.route("/AllBooks").post(getAllBooks);

export default router ;

<<<<<<< HEAD
// export router ;

=======
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
