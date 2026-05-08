import  jwt  from "jsonwebtoken";

const authMiddleware = (req:{headers:{authorization?:string}}, res:{status:(code:number)=>{json:(data:object)=>void}}, next:()=>void) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded
      next();
    }
    catch (err) {
      console.error("Error ",err)
      res.status(401).json({ message:"unauthorized" })
    }
  };

  export default authMiddleware;
