import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Individu = (props) => {
    
    const [data, setData] = useState([])
  
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/get-user?kode_nama=${props.match.params.id}`).then((response) => {
            setData(response.data);
        });
    }, []);

    return (
        <div>
        {data.length!=0 &&
            <div>
                <div className='row'>
                    <div className="col-7">
                        <div className="card">
                            <div className="card__body">
                                <h2>Profil Dosen {props.match.params.id}</h2>
                                <table>
                                    <tr>
                                        <td>KODE DOSEN</td>
                                        <td>: {data[0].kode_nama}</td>
                                    </tr>
                                    <tr>
                                        <td>JFA</td>
                                        <td>: {data[0].jfa}</td>
                                    </tr>
                                   {/* PENDIDIKAN       : {data2[0].}<br/> */}
                                   {/* KELOMPOK KEAHLIAN: {data2[0].status_kepegawaian}<br/> */}
                                    <tr>
                                        <td>PROGRAM STUDI</td>
                                        <td>: {data[0].program_studi}</td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card">
                            <div className="card__body">
                                <table>
                                    <tr>
                                        <td>Periode</td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Ganjil</td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Genap</td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Ganjil</td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                {/* <h2>Kinerja Dosen {props.match.params.id}</h2>
                                <h3>{data2[0].status_kepegawaian}</h3> */}
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>            
                <div className='row'>
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <h2>Grafik Kinerja {props.match.params.id}</h2>
                                <h3>{data[0].status_kepegawaian}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default Individu