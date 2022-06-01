import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2';
import ListTour from './ListTour'
import EditTour from './EditTour'
import { updateTour, getAllTours, deleteTour } from '../../../api/lib/ToursAPI';

function TourTable({setAll, TourId, all, setRender}) {

    const [editId, setEditId] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };
    console.log(editId);
    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {
        await updateTour(id, subId, data).then(() =>
            getAllTours()
        );
        setRender(prevState => !prevState)
        setEditId()
    }
    

    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    const handleDelete = (e, data, subId, id) => {
        e.preventDefault();        
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
                                title: 'Jūsų kategorijų įrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })

                        deleteTour(subId) //Delete choosen transaction type form database;
                        setAll(all.filter((data) => data._id !== subId))
                        setRender(prevState => !prevState)
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
    }


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
            <table>
                <thead>
                    <tr>
                        <th>Reikšmė</th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (
                        <React.Fragment key={data._id}>
                        {data.value === "" ? (
                                <></>
                        ) : (
                            editId === data._id ? (
                                <EditTour
                                    subId ={data._id}
                                    id={TourId}
                                    defaultData={data}
                                    onCancel={cancelEdit}
                                    onSubmit={submitEdit}
                            />
                            ) : (
                                <ListTour
                                    key={data._id}
                                    subId ={data._id}
                                    defaultData={data}
                                    value={data.value}
                                    text={data.text}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                            />
                            )
                        )
                        }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </>
            )}
        </>
    );
}

export default TourTable