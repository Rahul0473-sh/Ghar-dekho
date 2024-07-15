import jwt from "jsonwebtoken";
const verifyJwt = (req, res, next) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
          if (err) return res.json({ message: "Invalid Token" });
          req.userId = data.id;

          next();
        });
    } catch (error) {
        return res.json({ message: error.message });
    }
}
export default verifyJwt;