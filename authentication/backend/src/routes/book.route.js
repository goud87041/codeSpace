import { Router } from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller.js";
import JWT_MID from "../middlewere/JWT.middlewere.js";
=======
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller";
import JWT_MID from "../middlewere/JWT.middlewere";
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======
import {addBook,    editBook,    deleteBook,    getAllBooks } from "../controller/book.controller.js";
import JWT_MID from "../middlewere/JWT.middlewere.js";
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)


const router = Router();

router.use(JWT_MID)

<<<<<<< HEAD
<<<<<<< HEAD
router.route("/addBook").post(addBook);
=======
router.route("/addBook").post( addBook);
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======
router.route("/addBook").post(addBook);
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)
router.route("/editBook/:BookId").post(editBook);
router.route("/deleteBook/BookId").post(deleteBook);
router.route("/AllBooks").post(getAllBooks);

export default router ;

<<<<<<< HEAD
<<<<<<< HEAD
// export router ;

=======
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======
// export router ;

>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)
