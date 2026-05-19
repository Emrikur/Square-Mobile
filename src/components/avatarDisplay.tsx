import avatar from "../assets/images/avatars/avatar-bear.png"
export default function AvatarDisplay(){

  return (
    <>
    <div>
      <img style={{border:"2px solid black", margin:"1rem auto",borderRadius:"50%", backgroundColor:"pink", width:"192px", height:"192px"}} src={avatar} alt="" />

    </div>
    </>
  )
}
