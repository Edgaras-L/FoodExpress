import axiosRestaurant from '../apiRestaurant';
// import axios from "axios";

export async function getAllRestaurants() {
    const res = await axiosRestaurant.get('/');
    return res;
}

export const updateRestaurants = (data) => axiosRestaurant.post('/', JSON.stringify(data));

//Restaurant
export async function deleteRestaurant(subId) { await axiosRestaurant.patch(`/${subId}/delete`) };

export const updateRestaurant = (id, subId, data) => axiosRestaurant.post(`/${subId}`, JSON.stringify(data));

export const addNewRestaurant = (data) => axiosRestaurant.post(`/addNewRestaurant/`, JSON.stringify(data));



export async function getAllDishess() {
    const res = await axiosRestaurant.get('/');
    return res;
}

export const updateDishess = (data) => axiosRestaurant.post('/', JSON.stringify(data));

//Dishes
export async function deleteDishes(subId) { await axiosRestaurant.post(`/dishes/${subId}/delete`) };

export const updateDishes = (id, subId, data) => axiosRestaurant.post(`/dishes/${subId}/update`, JSON.stringify(data));

export const addNewDishes = (data) => axiosRestaurant.post(`/addNewDishes/`, JSON.stringify(data));




export async function getAllMenius() {
    const res = await axiosRestaurant.get('/');
    return res;
}

export const updateMenius = (data) => axiosRestaurant.post('/', JSON.stringify(data));

//Meniu
export async function deleteMeniu(subId) { await axiosRestaurant.post(`/meniu/${subId}/delete`) };

export const updateMeniu = (id, subId, data) => axiosRestaurant.post(`/meniu/${subId}/update`, JSON.stringify(data));

export const addNewMeniu = (data) => axiosRestaurant.post(`/addNewMeniu/`, JSON.stringify(data));