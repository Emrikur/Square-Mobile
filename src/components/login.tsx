import '../assets/styles/login.css';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
const navigate = useNavigate()
  const [answer,setAnswer] = useState("");
  const [err,setErr] = useState("");



async function submitForm(event: React.FormEvent<HTMLFormElement>) {

const form = event.currentTarget;

  try {
    event.preventDefault();

    console.log( form.username.value, form.password.value);
    await axios({
    method: 'post',
    url: 'http://localhost:5000/auth/login',
    data: {
    username: form.username.value,
    password: form.password.value
  }
}).then((response) => {
  if (response.status === 200) {
    setErr("");
    console.log(response.data);
    setAnswer(response.data.message);

    localStorage.setItem('token', response.data.token)
    // navigate('/dashboard');
    // setAnswer("");
    console.log("Login successful, token stored in localStorage:", response.data.token);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  }
}).catch((error) => {
  console.error(error);
  setErr((error.response?.data?.message || error.message));
}

  );
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

    </div>
    </>
  )
}
