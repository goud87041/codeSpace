import { Router } from "express";


const router = Router()

router.route("/").post((req, res )=>{
    res.status(200).json(200 ,"connection successfully.....")
})


export default router ;