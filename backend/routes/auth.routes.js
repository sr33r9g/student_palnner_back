import  Express  from "express";
import { login, logout, singup } from "../controller/auth.controller.js";
const router=Express.Router();
router.post("/singup",singup);
router.post("/login",login);
router.post("/logout",logout);



export default router;