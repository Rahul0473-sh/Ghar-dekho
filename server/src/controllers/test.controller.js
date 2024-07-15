import jwt from "jsonwebtoken";
export const shouldbelogin = async (req, res) => {
    console.log(req.userId);
    return res.json({ message: "You are Authenticated" });

};
export const shouldbeAdmin = async( req,res) => {
      try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
          if (err) return res.json({ message: "Invalid Token" });
            if (!data.isAdmin) return res.json({ message: "Not Authorised" });
            
        });
        return res.json({ message: "Authorized" }); 
      } catch (error) {
        return res.json({ message: error.message });
      }
}