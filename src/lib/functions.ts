import bcrypt from "bcryptjs";

export async function createHash(password: string) {
  if(password.length < 20){
    const newHash = await bcrypt.hash(`${password}`, 10);
    return newHash;
  }else{
    return "Password too long"
  }
}
