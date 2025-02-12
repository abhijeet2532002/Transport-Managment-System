import UserDB from '../model/User.js';
import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import Middleware from '../config/AuthMiddleware.js';

dotenv.config();

const { passwordEncrypt, comparePassword, passwordValidator, Auth } = new Middleware();

export default class User {
    async registerUser(req, res) {
        try {
            passwordValidator(req?.body?.password);
            const hashedPassword = passwordEncrypt(req?.body?.password);

            const newUser = await UserDB.create({ ...req.body, password: hashedPassword });
            return res.status(201).json({
                message: "User registered successfully",
                user: newUser
            });
        } catch (error) {
            return res.status(400).json({
                message: "Error registering user",
                error: error.message
            });
        }
    }

    async loginUser(req, res) {
        try {
            const { UserId, password } = req.body;

            const user = await UserDB.findOne({
                $or: [
                    { email: UserId },
                    { userName: UserId },
                    { phone: UserId }
                ]
            });


            if (!user) return res.status(404).json({ message: "User not found" });

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });


            if (req.headers.cookie)
                return res.status(200).json({ "Avaiable Token": req.headers.cookie.split('=')[1] });

            JsonWebToken.verify(user.authToken, process.env.SECRET_KEY, async (err) => {
                if (err) {
                    user.authToken = JsonWebToken.sign({
                        userName: user.userName,
                        email: user.email,
                        userRole: user.userRole,
                        userId: user.id
                    }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    await user.save();
                }
                req.user = user;
                res.cookie('token', user.authToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'Strict'
                });
                return res.status(200).json({ token: user.authToken });
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async logOutUser(req, res) {
        try {
            if (!req?.user?.email) return res.status(400).json({ message: "User email is required" });

            const user = await UserDB.findOneAndUpdate(
                { email: req.user.email },
                { authToken: null },
                { new: true }
            );

            if (!user) return res.status(404).json({ message: "User not found" });
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            req.user = "";
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getAllUserProfile(req, res) {
        try {
            if (req.user.userRole !== "admin")
                return res.status(403).json({ message: "Access denied" });

            const users = await UserDB.find({});
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getUserProfile(req, res) {
        try {
            if (!req?.user?.email) return res.status(400).json({ message: "Email is required" });

            const user = await UserDB.findOne({ email: req.user.email }).select('-password -__v -authToken');

            if (!user) return res.status(404).json({ message: "User not found" });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await UserDB.findOneAndDelete({ email: req.user.email });
            if (!deletedUser)
                return res.status(404).json({ message: "User not found" });
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async modifyUser(req, res) { }
}