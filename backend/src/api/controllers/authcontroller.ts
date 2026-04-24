interface Request {
    body: {
        username: string;
        password: string;
    };
}
interface Response{
    status: (code: number) => Response;
    json: (data: { success: boolean; message: string; token?: string }) => void;
};


export const login = (req: Request, res: Response) => {

  if (!req.body.username || !req.body.password || req.body.username.trim() === '' || req.body.password.trim() === '') {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

    //TODO: Check user authentication, such as username and password
    //TODO: Recieve login token?

//? Send the login request body to the console for debugging purposes
  console.log('Login request received with body:', req.body);

  //!
res.json({
    success: true,
    message: 'Login successful',
    token: 'your_jwt_token_here'
  });
}



export const logout = (req: Request, res: Response) => {


if (!req.body.username || req.body.username.trim() === '') {
    return res.status(400).json({ success: false, message: 'Username is required for logout' });
  }else {
  console.log('Logout request received', req.body);

//TODO: Clear session data and tokens on logout

  res.json({ success: true, message: 'Logout successful' });}
}
