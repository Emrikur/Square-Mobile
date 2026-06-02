import { useAuth } from "../hooks/useAuth";
import "../assets/styles/userPage.css"
import LogoutBtn from "../components/LogoutBtn";
import LayoutWrapper from "../components/LayoutWrapper";
import AvatarDisplay from "../components/avatarDisplay";
import { Settings, Clock5, Images } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";


export default function UserPage() {

  const navigate = useNavigate()



  const [avatarToggle, setavatarToggle] = useState(false)
  const [totalHours, setTotalHours] = useState(0)
  const { username, role, email, token, avatar, updateAvatar } = useAuth();
  const [avatarImg, setAvatarImg] = useState<string>("");


  console.log("AVATAR IMG in userpage: ",avatar)



   function handleAvatarChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedAvatar = e.target.value;
    console.log("Selected avatar:", selectedAvatar);
    setAvatarImg(selectedAvatar);
      sessionStorage.setItem("avatar", selectedAvatar)
    // const response = await axios.post("/api/user/avatar", { avatar: selectedAvatar });
// setavatarImg(response.data.avatar)

  }

  useEffect(() => {

    async function fetchUserHours() {
      const response = await axios(`http://localhost:5000/company/total-hours`, {
        method:"get",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      // console.log("User hours response: ", response.data);
      const hoursArray = response.data.map((entry: { hours_worked: string }) => entry.hours_worked);
      const totalHours = hoursArray.reduce((acc: string, hours: string) => acc + Number(hours), 0);
      setTotalHours(totalHours);
    // console.log("Total hours: ", hoursArray);
}
fetchUserHours()
},[])


useEffect(()=> {

  async function updateTheAvatar(){

console.log(avatarImg)


    if(avatarImg){
    const data = await axios({
        method: "put",
        url: `http://localhost:5000/user/avatar`,
        headers: { Authorization: `Bearer ${token}`},
        data:{
          avatarURL:avatarImg
        }

      }
    );

    //update in context and sessionStorage
    updateAvatar(avatarImg)


  }
}

updateTheAvatar()
}

,[avatarImg])





  return (
    <LayoutWrapper>
     <section className="userpage-section">

        <div className="title-wrapper">
          <div>
          <AvatarDisplay />
          <div className="change-avatar" onClick={() => setavatarToggle(!avatarToggle)} ><Images style={{color:"black"}}/></div>
          {avatarToggle && (
            <select name="avatar-select" id="avatar-select" onChange={handleAvatarChange}>
              <option value="time-singularity">Time Singularity</option>
              <option value="avatar-bear">Bear</option>
              <option value="avatar-bike">Bike</option>
              <option value="avatar-boat">Boat</option>
              <option value="avatar-car">Car</option>
              <option value="avatar-fish">Fish</option>
              <option value="avatar-owl">Owl</option>
              <option value="avatar-rocket">Rocket</option>
              <option value="avatar-turtle">Turtle</option>
            </select>
          )}
          </div>
          <p className="user-name">{username}</p>
          <p className="user-email">{email}</p>
          <p className="user-role">{role}</p>
        </div>

        <div className="userpage-hour-summary">
          <Clock5 className="calendar-clock" />
          <h2>Total logged hours</h2>
          <p style={{fontSize:"32px"}}>{totalHours}hrs</p>
          <p>All time</p>

        </div>

        <div className="userpage-btn-wrapper">
          <div onClick={() => navigate("/settings")} className="default-Btn" >
            <Settings/>
            <p style={{fontSize:"16px", padding:"0", margin:"0"}}>Settings</p>
          </div>
          <LogoutBtn/>
        </div>

      </section>
    </LayoutWrapper>
  );
}
