import axiosRestaurant from '../apiRestaurant';
// import axios from "axios";

export async function getAllRestaurants() {
    const res = await axiosRestaurant.get('/');
    return res;
}

export const updateRestaurants = (data) => axiosRestaurant.patch('/', JSON.stringify(data));

//Restaurant
export async function deleteRestaurant(subId) { await axiosRestaurant.patch(`/restaurant/${subId}/delete`) };

export const updateRestaurant = (id, subId, data) => axiosRestaurant.patch(`/restaurant/${subId}/update`, JSON.stringify(data));

export const addNewRestaurant = (data) => axiosRestaurant.patch(`/addNewRestaurant/`, JSON.stringify(data));
