import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export default class AuthMiddleware {
    Auth = (req, res, next) => {
        console.log(req);

        console.log(req?.headers)
        const token = req.headers?.cookie?.split('=')[1] || req?.headers?.Authorization?.split(' ')[1] || req?.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send('Access denied.  Please login first ......');
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).send('Invalid token.');
        }
    };

    passwordEncrypt = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SaltRound)))

    comparePassword = async (password, userPassword) => await bcrypt.compare(password, userPassword);

    passwordValidator = (password) => {
        if (password.length < 8) {
            throw new Error("Length of password is not matched (minimum 8 characters required) ❌");
        }
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            throw new Error("Invalid password format ❌\nMust contain: \n- At least one uppercase letter \n- At least one lowercase letter \n- At least one digit \n- At least one special character (@$!%*?&) \n- Minimum length of 8 characters");
        }
        return true;
    };
}