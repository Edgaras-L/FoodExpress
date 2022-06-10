import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Card from './Card';
import EditForm from './EditForm';
import { deleteTour, updateTour} from '../../../api/lib/TourAPI';
import { getAllUsers} from '../../../api/lib/TransactionsAPI';
import ReactPaginate from "react-paginate";

import './Styles/table.css';

function Table({ setAll, all, setEditId, userId, loading, setRender }) {

    const [page, setPage] = useState(0);
    const dataPerPage = 5;
    const numberOfDataVistited = page * dataPerPage;
    const totalPages = Math.ceil(all.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPage(selected);
    };


    const handleDelete = (e, data, subId) => {
        e.preventDefault();
        console.log(data.type) //Check type
            Swal
                .fire({
                    title: 'Ar tikrai norite pašalinti?',
                    text: 'Šio įrašo informacija bus prarasta negražinamai',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Atšaukti',
                    confirmButtonText: 'Panaikinti',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire({
                                title: 'Jūsų pajamų įrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })

                        deleteTour(userId, subId) //Delete choosen transaction type form database;
                        setAll(all.filter((data) => data._id !== subId))
                        setRender(prevState => !prevState)
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
    }

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };

    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {

        await updateTour(id, subId, data).then(() =>
            getAllUsers()
        );

    }

    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }
    
    //---SortByCreationDate---//
    function sortByDate(a, b) {

        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }

    all.sort(sortByDate);
    return (
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
                <div className='d-flex flex-row flex-nowrap justify-content-end w-100 pb-2 pt-2 main-exp'>
                    <div>
                        <span className='p-0 m-0 text-secondary'>Likutis</span> {/* exp*/}
                    </div>
                    <div>
                        <span className='p-0 m-0 text-secondary'>Pajamos</span> {/* exp*/}
                    </div>
                    <div>
                        <span className='p-0 m-0 me-4 text-secondary'>Išlaidos</span> {/* exp*/}
                    </div>
                </div>
                <table className='table table-borderless mx-auto'>
                    <thead className='thead text-center'>
                    <tr className='text-secondary'>
                            <th></th>
                            <th>Aprašymas</th>
                            <th>Kategorija</th>
                            <th>Data</th>
                            <th>Pajamos</th>
                            <th>Išlaidos</th>
                            <th className='text-secondary'>
                                <span>{all.length} {all.length < 10 && all.length > 1 ? 'Rezultatai' : all.length === 1 ? 'Rezultatas' : 'Rezultatų'}</span>
                            </th>
                        </tr >
                    </thead >
                    <tbody className='text-center'>
                        {!loading ?
                            all.slice(
                                numberOfDataVistited,
                                numberOfDataVistited + dataPerPage
                            )
                           
                                 (<EditForm
                                    id={userId}
                                    onCancel={cancelEdit}
                                    onSubmit={submitEdit}
                                />)

                            
                               (<Card
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    />)          
                                
                            : <tr><td className='loader'>Laukiama...</td></tr>
                        }
                    </tbody>
                </table>
                {!loading &&
                    <div className='m-0 mb-4'>
                        <ReactPaginate
                            pageCount={totalPages}
                            onPageChange={changePage}
                            activeClassName={"bg-warning fw-bold"}
                        />
                    </div>
                }
            </>
        )
        }
        </>
    )
    }

export default Table