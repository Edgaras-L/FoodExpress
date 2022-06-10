import axiosClient from '../apiTransactions';
import axiosUser from '../apiTransactions';
import axios from "axios"
import Swal from 'sweetalert2'

//User
export async function getAllUsers() {
  const res = await axiosClient.get('/');
  return res;
}

export const createNewUser = (username, password, email) => axiosClient.post('/auth/signup', {
    username: username,
    email: email,
    password: password
  })

export const loginUser = (username, password, email, data) => axiosClient.post('/auth/signin', {
  username: username,
  password: password
  // email: email
})
  .then((response) => {
    localStorage.setItem("user",  JSON.stringify(response.data.id))
    localStorage.setItem("username",  JSON.stringify(response.data.username))
    return response;
  });

export const signout = () => axios.post('http://localhost:3000/api/auth/signout')
  .then((response) => {
    console.log(response);
  });
