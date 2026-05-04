import '../assets/styles/login.css';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function Login() {
const navigate = useNavigate()
const {login} = useAuth();
  const [answer,setAnswer] = useState("");
  const [err,setErr] = useState("");

async function getInfo() {

const tokenResponse = await axios({
    method: 'get',
    url: 'http://localhost:5000/info',

})
setAnswer("Checking database for user...");
console.log(tokenResponse.data.token);
}

async function submitForm(event: React.FormEvent<HTMLFormElement>) {

const form = event.currentTarget;

  try {
    event.preventDefault();

    // console.log( form.username.value, form.password.value);
   const checkLogin = await axios({
    method: 'post',
    url: 'http://localhost:5000/auth/login',
    data: {
    username: form.username.value,
    password: form.password.value
  },

}

)
if (checkLogin.data.success) {

  setAnswer(checkLogin.data.message);
   login(checkLogin.data.token, checkLogin.data.userName);
   navigate('/dashboard', {state:{token: checkLogin.data.token, userName: checkLogin.data.userName}});
}else {
  navigate('/login');
  setErr(checkLogin.data.message);
}

  } catch (error) {
    console.error(error);
    setErr("An error occurred during login");
  }
}


  return (
    <>
    <div className="login-container">
      <h1>TimeTrack</h1>
      <form className='login-form' onSubmit={submitForm}>
        <input name='username' className='login-input' type="text" placeholder="Username" />
        <input name='password' className='login-input' type="password" placeholder="Password" />

      {!answer ? <button className='login-button' type="submit">Login</button> :


        <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
          <p>{answer}</p>
          <div className='loader'></div>
        </div>
      }
      {err && <p className='error-message'>{err}</p>}
      </form>

      <button onClick={getInfo}>Hämta FM-Info</button>

    </div>
    </>
  )
}
