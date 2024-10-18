import { Router } from "express";
import roleController from "../controller/role.controller.js";
import checkHeader from "../utility/middleware.js";
import authController from "../controller/auth.controller.js";

const RoleRoute = Router();

RoleRoute.post("/add", checkHeader, authController.validateToken, async (req, res) => {
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

RoleRoute.post("/add-sub", checkHeader, authController.validateToken, async (req, res) => {
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

RoleRoute.put("/edit-role", checkHeader, authController.validateToken, async (req, res) => {
    try {
        const response = await roleController.editRole(req.body);
        res.status(response.statusCode).json({
            status: "Success",
            data: response.data
        })
    } catch (error) {
        res.status(error.statusCode).json({
            status:"Fail",
            error: error.message
        })
    }
})

RoleRoute.get("/menu", checkHeader, authController.validateToken, async (req, res) => {
    try {
        const response = await roleController.getTopLevelMenu();
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

export default RoleRoute;