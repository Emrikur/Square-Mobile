import "../assets/styles/login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState("");

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;

    try {
      event.preventDefault();

      // console.log( form.username.value, form.password.value);
      const checkLogin = await axios({
        method: "post",
        url: "http://localhost:5000/auth/login",
        data: {
          email: form.email.value,
          password: form.password.value,
        },
      });

      if (checkLogin.data.success) {
        const response = checkLogin.data;
        setAnswer(response.message);
        setTimeout(() => {
          login(response.token, response.email, response.full_name, response.role);
          navigate("/dashboard");

        }, 3000);


        // console.log("The message: ",response.message)



      } else {
        const response = checkLogin.data;
        navigate("/login");
        setErr(response.message);
      }
    } catch (error) {
      console.error(error);
      setErr("An error occurred during login");
    }
  }

  return (
    <>
      <div className="login-container">
        {/* <h1 style={{fontFamily:"var(--TimeburnerBold)"}}>Time Singularity</h1> */}
        <form className="login-form" onSubmit={submitForm}>
          <input
            name="email"
            className="login-input"
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            className="login-input"
            type="password"
            placeholder="Password"
          />

          {!answer ? (
            <button className="login-button" type="submit">
              Login
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>{answer}</p>
              <div className="loader"></div>
            </div>
          )}
          {err && <p className="error-message">{err}</p>}
        </form>
      </div>
    </>
  );
}
