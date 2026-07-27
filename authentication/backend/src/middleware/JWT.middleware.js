import jwt from "jsonwebtoken";

const JWT_MID = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "Token not available"
            });
        }

        const validation = jwt.verify(token, process.env.JWT_SECRET);

        req.user = validation;
        next();

    } catch (error) {
        return res.status(403).json({
            error: "Token invalid or expired"
        });
    }
};

export default JWT_MID;