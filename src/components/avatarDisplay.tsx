
import { useAuth } from "../hooks/useAuth";
export default function AvatarDisplay() {
const { avatar } = useAuth();
// console.log("From context - \nUsername:", username,"\nRole:", role,"\nemail:", email);
// const currentAvatar = `../assets/images/avatars/${avatarPortrait}.png`
// console.log("Avatar in displayavatar: ", avatar)
  return (
    <>
      <div>
        <img style={{border:"2px solid black", margin:"1rem auto",borderRadius:"50%", backgroundColor:"pink", width:"192px", height:"192px"}} src={`/avatars/${avatar}.png`} alt="" />

      </div>
    </>
  )
}
