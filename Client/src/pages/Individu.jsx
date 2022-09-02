import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Individu = (props) => {
    
    const [data, setData] = useState([])
    const [periode, setPeriode] = useState("Ganjil_2019")
  
    useEffect(() => {
        // Axios.get(`http://localhost:3001/api/get-user?kode_nama=${props.match.params.id}`, {"periode": "Ganjil_2020"}).then((response) => {
        Axios.get("http://34.101.42.148:3001/api/get-user/"+periode+"/"+props.match.params.id).then((response) => {
            setData(response.data);
        });
    }, []);
    console.log(data.length)
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
                                        <td>KODE</td>
                                        <td>: {data[0].kode}</td>
                                    </tr>
                                    <tr>
                                        <td>JFA</td>
                                        <td>: {data[0].jfa}</td>
                                    </tr>
                                    <tr>
                                        <td>PENDIDIKAN</td>
                                        <td>: {data[0].pendidikan_terakhir}</td>
                                    </tr>
                                    <tr>
                                        <td>KELOMPOK KEAHLIAN</td>
                                        <td>: {data[0].kelompok_keahlian}</td>
                                    </tr>
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
                                        <td>Dharma 2</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Ganjil</td>
                                        <td>{data[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data[0].penunjang.toFixed(1)}</td>
                                    </tr>
                                    <tr>
                                        <td>Genap</td>
                                        <td>{data[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data[0].penunjang.toFixed(1)}</td>
                                    </tr>
                                    <tr>
                                        <td>Ganjil</td>
                                        <td>{data[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data[0].penunjang.toFixed(1)}</td>
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