

const authMiddleware = (req:{headers:{authorization?:string}}, res:{status:(code:number)=>{json:(data:object)=>void}}, next:()=>void) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  };

  export default authMiddleware;
