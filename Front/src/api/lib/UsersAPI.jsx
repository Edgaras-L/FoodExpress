import axiosClient from '../apiUsers';
import axiosUser from '../apiUsers';
import axios from "axios"

//User
export async function getAllUsers() {
  const res = await axiosClient.get('/');
  return res;
}

export const createNewUser = (name, password, email, data) => axiosClient.post('/auth/signup', {
  username: name,
  email: email,
  password: password
})
  .then((response) => {
    console.log(response);
  });

export const loginUser = (name, password, email, data) => axiosClient.post('/auth/signin', {
  username: name,
  password: password
  // email: email
})
  .then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data.id))
    localStorage.setItem("name", JSON.stringify(response.data.username))
  });

export const signout = () => axios.post('http://localhost:3000/api/auth/signout')
  .then((response) => {
    console.log(response);
  });


