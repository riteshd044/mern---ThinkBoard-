import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires after 7 days (time is in milliseconds)
        httpOnly: true, // Prevents JavaScript access (protects against XSS attacks)
        sameSite: "strict", // Prevents the cookie from being sent in cross-site requests (protects against CSRF attacks)
        secure: process.env.NODE_ENV !== "development", // Sends cookie only over HTTPS (enabled in production, disabled in local development)
    });

    return token;
}