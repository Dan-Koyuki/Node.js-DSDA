import { Router } from "express";
import checkHeader from "../utility/middleware.js";
import authController from "../controller/auth.controller.js";

const AuthRoute = Router();

AuthRoute.post("/login", checkHeader, async (req, res) => {
    try {
        console.log(req.body)
        const response = await authController.sentMail(req.body.mail);
        console.log(response);
        res.status(response.statusCode).json({
            status: "Success",
            data: response.data.message,
        })
    } catch (error) {
        res.status(error.statusCode).json({
            status: "Fail",
            error: error.message
        })
    }
})

AuthRoute.post("/check", checkHeader, (req, res) => {
    try {
        const response = authController.verify(req.body.code);
        console.log(response);
        res.status(response.statusCode).json({
            status: "Success",
            data: response.data,
        })
    } catch (error) {
        res.status(error.statusCode).json({
            status: "Fail",
            error: error.message
        })
    }
})

export default AuthRoute;