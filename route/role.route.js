import { Router } from "express";
import roleController from "../controller/role.controller.js";

const RoleRoute = Router();

RoleRoute.post("/add", async (req, res) => {
    try {
        console.log("Im here??")
        const response = await roleController.add(req.body);
        res.status(response.statusCode).json({
            status: "Success",
            data: response.data,
          });
    } catch (error) {
        res.status(error.statusCode).json({
            status: "Fail",
            error: error.message
        })
    }
})

RoleRoute.get("/add", (req, res) => {
    res.status(200).json({
        message: "Hello!!!!!!"
    })
})

export default RoleRoute;