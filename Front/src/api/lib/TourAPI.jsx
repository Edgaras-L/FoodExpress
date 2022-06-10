import axiosTour from '../apiTour';
// import axios from "axios";

export async function getAllTours() {
    const res = await axiosTour.get('/');
    return res;
}

export const updateTours = (data) => axiosTour.patch('/', JSON.stringify(data));

//Tours
export async function deleteTour(subId) { await axiosTour.patch(`/tour/${subId}/delete`) };

export const updateTour = (id, subId, data) => axiosTour.patch(`/tour/${subId}/update`, JSON.stringify(data));

export const addNewTour = (data) => axiosTour.patch(`/addNewTour/`, JSON.stringify(data));