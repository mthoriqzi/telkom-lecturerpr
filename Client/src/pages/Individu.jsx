import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Individu = (props) => {
    
    const [data, setData] = useState([])
    const [dataList, setDataList] = useState([])
    const [periode, setPeriode] = useState("Ganjil_2019")
  
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/get-user?kode_nama=${props.match.params.id}`).then((response) => {
            setData(response.data);
        Axios.get('http://localhost:3001/api/get/'+periode).then((response) => {
            setDataList(response.data);
              });
        });
    }, []);
// var dharma1 = 0
// var dharma2 = 0
// var dharma3 = 0


// if (dataList.length!=0){
//     for (var i in dataList){
//         // console.log(dataList["status_kepegawaian"])
//         if (dataList[i]["kode_nama"]==data[0].kode_nama)
//             if (dataList[i][""]=="DOSEN PEGAWAI TETAP")
//         pegawai_tetap = pegawai_tetap + 1
//         // console.log("mashok")
//         pegawai_tetap = pegawai_tetap + 1

//         if (dataList[i]["status_kepegawaian"]=="DOSEN CALON PEGAWAI TETAP")
//         // console.log("mashok2")
//         pegawai_calonpegawaitetap = pegawai_calonpegawaitetap + 1

//         if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL FULL TIME")
//         // console.log("mashok1")
//         pegawai_profulltime = pegawai_profulltime + 1

//         if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL PART TIME")
//         // console.log("mashok2")
//         pegawai_proparttime = pegawai_proparttime + 1


//     }

// }

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