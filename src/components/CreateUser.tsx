import "../assets/styles/createUser.css";
// import type UserFormData from "../lib/types";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
export default function CreateUser() {

  const { token } = useAuth();

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {


 event.preventDefault();
  const formData = event.currentTarget as HTMLFormElement & {
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    role: HTMLSelectElement;
    salary: HTMLInputElement;
    status: HTMLSelectElement;
  };
// Konverterar statusvärdet från string till boolean
  const userStatus = formData.status.value === "true" ? true : false;
  console.log("Form data: ", formData.firstName.value);

  const fullName =
  formData.firstName.value.charAt(0).toUpperCase() +
  formData.firstName.value.slice(1) + " " +
  formData.lastName.value.charAt(0).toUpperCase() +
  formData.lastName.value.slice(1);
  const email = formData.email.value.toLowerCase();


  const userData = {
    fullName: fullName,
    email: email,
    password: formData.password.value,
    role: formData.role.value,
    salary: formData.salary.value,
    status: userStatus
  };
  console.log("User data to be sent to backend: ", userData);

const response = await axios({
  method: "post",
  url: "http://localhost:5000/admin/user/create",
  headers: { Authorization: `Bearer ${token}` },
  data: userData});

console.log("Response from backend: ", response.data.success);
console.log("Response message from backend: ", response.data.message);

if(response.data.success){
  toast.success(response.data.message)
  // Töm formuläret efter att användare skapats
  formData.reset();
}else if(response.data.success === false){
  toast.error(response.data.message)
}
}


  return (
    <div className="user-creation-container">
      <form onSubmit={handleSubmit} name="userCreationForm" className="user-creation-form">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="role">Role:</label>
        <select id="role" name="role">
          <option value="developer">Developer</option>
          <option value="sales">Sales</option>
        </select>
        <label htmlFor="salary">Hourly rate (€):</label>
        <input type="number" id="salary" name="salary" step="1" />
        <label htmlFor="status">Status:</label>
        <select id="status" name="status">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button className="default-Btn" type="submit">Create User</button>
      </form>
    </div>
  );
}
