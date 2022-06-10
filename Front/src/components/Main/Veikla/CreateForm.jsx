import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { GrTransaction } from "react-icons/gr";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { addNewTour} from '../../../api/lib/TourAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './Styles/create.css';

function CreateForm({ handlepopupClose, userId, render, setRender }) {

    const [restaurant, setRestaurant] = useState("");
    const [dishes, setDishes] = useState("");
    const [load, setLoad] = useState(true)
    const [tours, setTours] = useState([]);
    let [restaurants, setDataRestaurants] = useState([]);
    let [dishess, setDataDishess] = useState([]);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
      
    });

    //Duomenų siuntimas į duombazę
    const onSubmit = async (data, username) => {
        if (restaurant !== "" && dishes !== "") { // if choosen incomes type button

            Swal.fire({
                title: 'Išrašas sėkmingas!',
                text: 'Naujas pajamų išrašas pridėtas!',
                icon: 'success',
                confirmButtonText: 'Puiku!'
            });

            await addNewTour(data, userId).then(() => { setRender(!render) })            //send data into database(depending on current UserId)
            handlepopupClose(false); //close create-pop-up after submit
            reset(''); //reset input values
        } else {

            Swal.fire({
                title: 'Išrašas nesėkmingas!',
                text: 'Privaloma pasirinkti išrašo tipą!',
                icon: 'warning',
                confirmButtonText: 'Pasirinkti'
            })
        }
    }



    const getAllRestaurant = async () => {

        fetch('http://localhost:3000/api/v1/restaurant')
            .then(res => res.json())
            .then((json) => {
                setDataRestaurants(json.data.restaurants[0].restaurant);
                setLoad(false)
            })
    }

    useEffect(() => {
        getAllRestaurant();
    }, [])

    const getAllDishes = async () => {

        fetch('http://localhost:3000/api/v1/restaurant/dishes')
            .then(res => res.json())
            .then((json) => {
                setDataDishess(json.data.dishess[0].dishes);
                setLoad(false)
            })
    }

    useEffect(() => {
        getAllDishes();
    }, [])

    return (
        <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock p-4'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-5 align-items-center p-4'>
                    <div className='border border-3 border-primary rounded text-center'><GrTransaction /></div>
                    <h4 className='ms-5'>Naujas restoranas</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-start'>Restoranas</label>
                    <select
                        {...register('restaurant')}
                        defaultValue=''
                        onChange={(e) => setRestaurant(e.target.value)}
                        className='border bg-transparent text-muted'>
                        <option value='' disabled>--Pasirinkite Restorana--</option>
                        {restaurants.map(item => {
                            return (<option  value={item.value}>{item.value}</option>)
                        })}
                    </select>
                    <p className='error p-0 text-danger'>{errors.description?.message}</p>
                    <div className='info d-flex flex-row my-4'>
                        <div className='amountblock d-flex flex-column'>
                     <select
                        {...register('dishes')}
                        defaultValue=''
                        onChange={(e) => setDishes(e.target.value)}
                        className='border bg-transparent text-muted'>
                        <option value='' disabled>--Pasirinkite patiekalus--</option>
                        {dishess.map(item => {
                            return (<option  value={item.value}>{item.value}</option>)
                        })}
                    </select>
                            <p className=' p-0 text-danger'>{errors.amount?.message}</p>
                        </div>
                    </div>
                    <div className='formfooter d-flex flex-row flex-wrap mt-5'>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-light'
                                type='submit' id="btn" disabled={!restaurant || !dishes}>Sukurti
                            </button>
                        </div>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-dark'
                                onClick={handlepopupClose}
                                type='submit'>Atšaukti
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CreateForm
