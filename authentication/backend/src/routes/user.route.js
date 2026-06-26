import { JsonWebTokenError } from "jsonwebtoken";
import { userLogin ,registerUser, getUserProfile} from "../controller/auth.controller";
import JWT_MID from "../middlewere/JWT.middlewere";


const router = router();

router.route('/register').post(registerUser);

router.route('/login').post(userLogin)

router.route('/:userId').post(JWT_MID , getUserProfile)
    

export default  router 
