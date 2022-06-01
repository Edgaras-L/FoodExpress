import axiosClient from '../apiUsers';
// import axiosUser from '../apiUsers';
import axios from "axios"
// import Swal from 'sweetalert2'

//User
export async function getAllUsers() {
  const res = await axiosClient.get('/');
  return res;
}
export const createNewUser = (name, email, password) => axiosClient.post('/auth/signup', {
    name: name,
    email: email,
    password: password
  })
export const loginUser = (password, email, data) => axiosClient.post('/auth/login', {
  email: email,
  password: password
})
  .then((response) => {
    localStorage.setItem("user",  JSON.stringify(response.data.id))
    localStorage.setItem("name",  JSON.stringify(response.data.username))
    return response;
  });

export const signout = () => axios.post('http://localhost:3000/api/auth/signout')
  .then((response) => {
    console.log(response);
  });


