import {v4 as uuidv4} from 'uuid';

interface Request {
    body: {
        username: string;
        password: string;
    };
}
interface Response{
    status: (code: number) => Response;
    json: (data: { success: boolean; message: string; userName:string, token?: string }) => void;
};


export const login = (req: Request, res: Response) => {

const testUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    { username: 'user4', password: 'password4' },
    { username: 'user5', password: 'password5' },
    { username: 'user6', password: 'password6' },
    { username: 'user7', password: 'password7' },
    { username: 'user8', password: 'password8' },
    { username: 'user9', password: 'password9' }
  ];

  const sessionID = uuidv4();

  if (!req.body.username || !req.body.password || req.body.username.trim() === '' || req.body.password.trim() === '') {
    return res.status(400).json({ success: false, userName:"", message: 'Username and password are required' });
  }


//! SQL-Call to FM database to check if the user and password exists
//! Will be replaced with actual database calls in the future, currently uses a hardcoded list of users for testing purposes


  if (!testUsers.find(user => user.username === req.body.username && user.password === req.body.password)) {
    return res.status(401).json({ success: false, userName:"", message: 'Invalid username or password' });
  }else if (testUsers.find(user => user.username === req.body.username && user.password === req.body.password)) {
    res.json({
        success: true,
        message: `Hello ${req.body.username}, redirecting...`,
        userName: req.body.username,
        token: sessionID
    });

  }

    //TODO: Check user authentication, such as username and password - see authMiddleware for reference.
    //TODO: Recieve login token?

//? Send the login request body to the console for debugging purposes
  // console.log('Login request received with body:', req.body);




}


export const logout = (req: Request, res: Response) => {



if (!req.body.username || req.body.username.trim() === '') {
    return res.status(400).json({ success: false, userName: "", message: 'Username is required for logout' });
  }else {
  console.log('Logout request received', req.body);

//TODO: Clear session data and tokens on logout

  res.json({ success: true, userName: req.body.username, message: 'Logout successful' });}
}
