import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { getAllTours } from '../../../api/lib/ToursAPI';
import CreateTourForm from './CreateTourForm';
import TourTable from './TourTable';
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdOutlineAccountCircle, MdOutlineTour, MdOutlineDashboardCustomize, MdOutlineAdminPanelSettings } from "react-icons/md";

function MainAdminTable({admin}) {
  const [accountpopup, setAccountPopUp] = useState(false);
  const [all, setAll] = useState([]);
  const [tour, setTour] = useState([]);
  const [tourId, setTourId] = useState(false);
  const [render, setRender] = useState(false);
  const [userId, setId] = useState([]);
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();
  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  //---FetchData---//

  useEffect(() => {
    if (localStorage.user === undefined) {
      navigate('/');
    }else{
        {admin ? (navigate('/')) : (

          getAllTours().then((res) => {
            const tourdata = res.data.data.tours;
            setTourId(...tourdata.map((data) => data._id));
            setTour(...tourdata.map((data) => data.tour));
          })
      
      )}
    }
  }, [render, tourId]);

  useEffect(() => {
    let tempAll = [...tour]; 
    setAll(tempAll);
}, [tour])

  
  function vardas(){
        if(localStorage.user !== undefined){
            let getVardas = localStorage.getItem("name")
            return getVardas.replace(/['"]+/g, '')
        }
    }

    useEffect(() => {
      if(localStorage.user !== undefined){
        setUser(localStorage.getItem("user").replace(/['"]+/g, ''))
      }
    }, []);

    function clearUser() {
      localStorage.clear();
      navigate('/');

  }

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
}    

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
        <div className='sidenav text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
          <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span>BudgetSimple</span></p>
          <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
            <span className='text-light'>Veikla</span>
          </Link>
          <Link to="/admin" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><MdOutlineAdminPanelSettings /></span>
            <span className='text-light'>Valdyba</span>
          </Link>
        </div>
        <div className='mainadmincontent p-0 m-0'>
          <div className='header'>
            {/* Visible on medium and small screens */}

            <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
              <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
              <div className='links d-flex flex-row justify-content-center fs-5'>
                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span><span className='text-light'>Veikla</span></Link>
                <Link to="/admin" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><MdOutlineAdminPanelSettings /></span><span className='text-light'>Valdyba</span></Link>
                <div className='account d-flex flex-row justify-content-end p-3'>
                  <div className='d-flex user' onClick={toggleAccountPopup}>
                    <div className='fs-5 ps-1 pe-1 border-bottom border-warning'><MdOutlineAccountCircle className='text-light' /></div>
                    <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                    <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
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
                <div className='fs-5 ps-1 pe-1 d-block'><MdOutlineAccountCircle className='text-light' /></div>
                <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                {accountpopup &&
                  <div className="acc-content shadow rounded">
                    <button className='btn' onClick={clearUser}>Atsijungti</button>
                  </div>
                }
              </div>
          </div>
          <div className='main pt-3'>
            <div className='row activitiestable border border-1 border-muted mx-auto p-3 shadow w-100'>
              <div className='d-flex flex-row position-relative'>
                <h5 className='w-100 p-0 m-0'>...</h5>
                  <>
                    <TourTable
                      tourId={tourId}
                      setAll={setAll}
                      all={all}
                      setRender={setRender}
                      render={render}
                      userId={user}
                    />
                  </>
                  <>
                  
                    <div className='row activitiestable border border-1 border-muted mx-auto my-4 p-3 shadow text-muted d-flex flex-row'>
                        <h5 className='w-100 p-0 m-0'>Kategorios</h5>
                        <div>
                            <button
                              onClick={toggleAddPopup}
                              className='btn bg-transparent border-0'>
                              <RiAddFill className='text-center me-3' />
                              <span>Pridėti  kategorija</span>
                            </button>
                        </div>
                    </div>
                    {isOpen &&
                            <CreateTourForm
                                handlepopupClose={toggleAddPopup}
                                setRender={setRender}
                                userId={user}
                                render={render}
                            />}
                  </> 
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  </div>
  )
}

export default MainAdminTable