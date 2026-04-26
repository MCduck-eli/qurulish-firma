import authService from "../services/auth-service";

class AuthController {
    async login(req: any, res: any) {
        try {
            const { username, password } = req.body;

            const token = await authService.login(username, password);

            res.cookie("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "lax",
            });

            res.json({ success: true, message: "Muvaffaqiyatli kirildi" });
        } catch (error: any) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    async verify(req: any, res: any) {
        res.json({ authenticated: true });
    }

    async logout(req: any, res: any) {
        res.clearCookie("admin_token");
        res.json({ success: true, message: "Tizimdan chiqildi" });
    }
}

const authController = new AuthController();
export default authController;
