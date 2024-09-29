import { Router } from "express";
import roleController from "../controller/role.controller.js";

const RoleRoute = Router();

RoleRoute.post("/add", async (req, res) => {
    try {
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

RoleRoute.post("/add-sub", async (req, res) => {
    try {
        const response = await roleController.addSub(req.body);
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
});

RoleRoute.get("/menu", async (req, res) => {
    try {
        const response = await roleController.getMenu();
        res.status(response.statusCode).json({
            status: "Success",
            data: response.data,
          });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: "No Menu Found!"
        })
    }
})

RoleRoute.get("/add", (req, res) => {
    res.status(200).json({
        message: "Hello!!!!!!"
    })
})

export default RoleRoute;