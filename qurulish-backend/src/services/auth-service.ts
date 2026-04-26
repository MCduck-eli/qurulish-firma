import jwt from "jsonwebtoken";

class AuthService {
    async login(username: any, password: any) {
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        console.log("Kiritilgan:", username, password);
        console.log("Kutilayotgan:", adminUser, adminPass);
        if (username !== adminUser || String(password) !== String(adminPass)) {
            throw new Error("Login yoki parol xato!");
        }

        const token = jwt.sign({ role: "admin" }, jwtSecret, {
            expiresIn: "1d",
        });

        return token;
    }

    async verifyToken(token: string) {
        const jwtSecret = process.env.JWT_SECRET || "default_secret";
        try {
            return jwt.verify(token, jwtSecret);
        } catch (err) {
            throw new Error("Token yaroqsiz!");
        }
    }
}

const authService = new AuthService();
export default authService;
