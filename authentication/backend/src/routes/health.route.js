import { Router } from "express";


const router = Router()

router.route("/").post((req, res )=>{
    res.status(200).json({ status: 200, message: "connection successfully....." })
})


export default router ;