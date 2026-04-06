import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-doctor", UserController.createDoctor);
// router.post("/create-doctor", UserController.createDoctor);
// router.post("/create-doctor", UserController.createDoctor);


export const UserRoutes = router;
