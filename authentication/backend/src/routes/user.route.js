<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)
// import { JsonWebTokenError } from "jsonwebtoken";
import { Router } from "express";
import { userLogin ,registerUser, getUserProfile} from "../controller/auth.controller.js";
import JWT_MID from "../middlewere/JWT.middlewere.js";
 
<<<<<<< HEAD


const router = Router();
=======
import { JsonWebTokenError } from "jsonwebtoken";
import { userLogin ,registerUser, getUserProfile} from "../controller/auth.controller";
import JWT_MID from "../middlewere/JWT.middlewere";


const router = router();
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
=======


const router = Router();
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)

router.route('/register').post(registerUser);

router.route('/login').post(userLogin)

router.route('/:userId').post(JWT_MID , getUserProfile)
    

export default  router 
