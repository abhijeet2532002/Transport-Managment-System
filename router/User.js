import express from "express";
import Middleware from "../config/AuthMiddleware.js";
import User from "../controller/User.js";

const router = express.Router();
const { Auth } = new Middleware();
const { registerUser, loginUser, logOutUser, getUserProfile, getAllUserProfile, modifyUser, deleteUser } = new User();

router.post("/signUp", registerUser);
router.post("/login", loginUser);
router.get("/logout", Auth, logOutUser);
router.get("/get", Auth, getUserProfile);
router.get("/getAll", Auth, getAllUserProfile);
router.put("/modify", Auth, modifyUser);
router.delete("/remove", Auth, deleteUser);


export default router;