
import '../assets/styles/HashPassword.css'
import { createHash } from "../lib/functions";
import { useState } from "react";


export default function CreateHashPassword() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [clickedCopy, setClickedCopy] = useState<boolean>(false);

  async function handlePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = (event.target as HTMLFormElement).dotheHash.value;
    console.log("input", input);
    if (input.length > 0) {
      setCurrentPassword(input);
      const response = await createHash(input);
      setNewPassword(response);
    } else {
      setCurrentPassword("");
      return null
    }

  }

  function copy(newPass:string){


    if(newPass){
      setClickedCopy(true)

      setTimeout(() => {
        setClickedCopy(false)
      }, 3000);


    }else{
      return null
    }
  }

  return (
    <>
      <div className="hash-container">
        <form
        className="hash-form"
          onSubmit={handlePassword}
          action=""
        >

            <label htmlFor="dotheHash">enter password to hash</label>
            <input name="dotheHash" type="text" />
            <input value="Create hash" type="submit" />


        </form>
        <div className='hash-center'>
          <p>
            Create hash from: "{currentPassword ? currentPassword : null}"
          </p>
          <p>To:</p>

          {newPassword ? <p className='hash-result'
            onClick={() => {navigator.clipboard.writeText(newPassword); copy(newPassword)}}
            style={{ textAlign: "center" }}
          >
            {newPassword}
          </p> : null}
          <p>{clickedCopy ? "copied to clipboard" : null}</p>
        </div>
      </div>
    </>
  );
}
