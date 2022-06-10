import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { RiAddFill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from '../../../api/lib/TransactionsAPI';
import CreateForm from './CreateForm';
import Table from './Table';

import './Styles/maincontent.css';

function MainContainer() {
    //Pop up
    const [accountpopup, setAccountPopUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [filterpopup, setFilterPopup] = useState(false);
    const [utilitiespopup, setUtilitiesPopUp] = useState(false);

    //Data
    const [admin, setAdmin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [all, setAll] = useState([]);
    const [editId, setEditId] = useState([]);
    const [userId, setId] = useState([]);
    const [render, setRender] = useState(false);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().substring(0, 10);

    let navigate = useNavigate();


    //User account menu popup
    const toggleAccountPopup = () => {
        setAccountPopUp(!accountpopup);
    }

    //User add transactions popup
    const toggleAddPopup = () => {
        setIsOpen(!isOpen);
    }

    //User filter transactions popup
    const toggleFilterPopup = () => {
        setFilterPopup(!filterpopup);
        setEditId('')
    }

    //User balance utilities popup
    const toggleUtilitiesPopUp = () => {
        setUtilitiesPopUp(!utilitiespopup)
    }


    let text = localStorage.getItem("user");
    let obj = JSON.parse(text)



    function clearUser() {
        localStorage.clear();
        navigate('/');

    }

    let [users, setUsers] = useState([])
 //---FetchData---//
 useEffect(() => {
    if (localStorage.user === undefined) {
        console.log(localStorage.user)
        navigate('/');
}else{
    getAllUsers().then((res) => {
        // console.log(res.data.data.transactions);
        const userdata = res.data.data.transactions; //Fetch all existing data from database
        let userAllIds = userdata.filter((data) => data._id === obj); //Take All users Ids
        setEditId(...userAllIds.map((data) => data._id === obj)); //Take User Id for edit 
        setId(...userAllIds.map((data) => data._id)); //Take User Id
        let roles = userAllIds.map((data) => data._id === obj ? (data.roles):(''));
        setAdmin(roles[0] === 'admin');
        setTimeout(() => setShow(true), 1);
        setLoading(false);
    });
}

}, [render, userId]);

    function vardas(){
        if(localStorage.user !== undefined){
            let getVardas = localStorage.getItem("username")
            return getVardas.replace(/['"]+/g, '')
        }

    }//, [navigate, obj, render, userId]);



    return (
        <div className='container-fluid p-0 m-0'>
            <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
                <div className='sidemenu text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
                    <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span className='text-secondary'>BudgetSimple</span></p>
                {show &&
                    <>
                    <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
                        <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                        <span>Veikla</span>
                    </Link>
                    {!admin ? (
                        <></>
                    ) : (
                        <Link to="/admin" className='p-3 text-decoration-none text-muted'>
                            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                            <span>Valdyba</span>
                        </Link>
                    )}
                    </>
                }
                </div>
                <div className='maincontent p-0 m-0'>
                    <div className='header'>
                        {/* Visible on medium and small screens */}

                        <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
                            <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
                            <div className='links d-flex flex-row justify-content-center fs-5'>
                            {show &&
                         <>
                        <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
                            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                            <span>Veikla</span>
                        </Link>
                    {!admin ? (
                        <></>
                    ) : (
                        <Link to="/admin" className='p-3 text-decoration-none text-muted'>
                            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
                            <span>Valdyba</span>
                        </Link>
                    )}
                    </>
                }
                                <div className='account d-flex flex-row justify-content-end p-3'>
                                    <div className='d-flex user' onClick={toggleAccountPopup}>
                                        <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdAccountCircle /></div>
                                        <div className='fs-5 ps-1 pe-1 text-muted'>{vardas()}</div>
                                        <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                                        {accountpopup &&
                                            <div className="acc-content shadow rounded">
                                                <button className='btn' onClick={clearUser}>Atsijungti</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Visible on large screens */}
                        <div className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
                            <div className='d-flex user' onClick={toggleAccountPopup}>
                                <div className='fs-5 ps-1 pe-1 d-block'><MdAccountCircle /></div>
                                <div className='fs-5 ps-1 pe-1'>{vardas()}</div>
                                <span className='fs-5 ps-2 pe-5 text-muted'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                                {accountpopup &&
                                    <div className="acc-content shadow rounded">
                                        <button className='btn' onClick={clearUser}>Atsijungti</button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='ps-5 py-4'>
                            <h5 className='title m-0 d-block'>Padarykite užsakumą</h5>
                        </div>
                    </div>
                    <div className='main pt-3'>
                        <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
                            <div className='d-flex flex-row position-relative'>
                                <button onClick={toggleUtilitiesPopUp} className='btn d-lg-none'><TiThMenu /></button>
                                            <button
                                                onClick={toggleAddPopup}
                                                className='btn bg-transparent border-0'>
                                                <RiAddFill className='text-center me-3' />
                                                <span>Pridėti įrašą</span>
                                            </button>
                                        </div>
                                    </div>
                            </div>
                
                                <div className="h-25 text-center">
                                    <button
                                        onClick={toggleAddPopup}
                                        className='btn add text-center p-1 me-2'>
                                        <span><RiAddFill className='text-center' /></span>
                                    </button>
                                    <span>Pridėti įrašą</span>
                                </div>
                            </div>
                        </div>
                      
                        <div className='row activitiestable mx-auto mt-4 shadow text-muted d-flex flex-row'>
                            {!loading &&
                                <Table
                                    setAll={setAll}
                                    all={all}
                                    setEditId={setEditId}
                                    editId={editId}
                                    userId={userId}
                                    loading={loading}
                                    setRender={setRender}
                                />
                            }
                        </div>
                        {isOpen &&
                            <CreateForm
                                handlepopupClose={toggleAddPopup}
                                setId={setId}
                                userId={userId}
                                render={render}
                                setRender={setRender}
                            />}
                    </div>

    )
}

export default MainContainer