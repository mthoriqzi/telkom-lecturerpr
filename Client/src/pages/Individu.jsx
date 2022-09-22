import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux'

const Individu = (props) => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    const [data20191, setData20191] = useState([])
    const [data20192, setData20192] = useState([])
    const [data20201, setData20201] = useState([])
    const [data20202, setData20202] = useState([])
    const [data20211, setData20211] = useState([])
    const [data20212, setData20212] = useState([])
    const [data20221, setData20221] = useState([])
    const [data20222, setData20222] = useState([])
    const [periode, setPeriode] = useState("Ganjil_2021")
  
    useEffect(() => {
        // Axios.get(`http://localhost:3001/api/get-user?kode_nama=${props.match.params.id}`, {"periode": "Ganjil_2020"}).then((response) => {
        Axios.get("http://34.101.223.149:3001/api/get-user/Ganjil_2019/"+props.match.params.id).then((response) => {
            setData20191(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Genap_2019/"+props.match.params.id).then((response) => {
            setData20192(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Ganjil_2020/"+props.match.params.id).then((response) => {
            setData20201(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Genap_2020/"+props.match.params.id).then((response) => {
            setData20202(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Ganjil_2021/"+props.match.params.id).then((response) => {
            setData20211(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Genap_2021/"+props.match.params.id).then((response) => {
            setData20212(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Ganjil_2022/"+props.match.params.id).then((response) => {
            setData20221(response.data);

        });
        Axios.get("http://34.101.223.149:3001/api/get-user/Genap_2022/"+props.match.params.id).then((response) => {
            setData20222(response.data);

        });
        
    }, []);
    // console.log(data20201.length)
    // console.log(data20191[0].lit_diakui)
    var p20191 = 0
    var p20192 = 0
    var p20201 = 0
    var p20202 = 0
    var p20211 = 0
    var p20212 = 0
    var p20221 = 0
    var p20222 = 0
    var dp20191 = 0
    var dp20192 = 0
    var dp20201 = 0
    var dp20202 = 0
    var dp20211 = 0
    var dp20212 = 0
    var dp20221 = 0
    var dp20222 = 0
    var hp20191 = 0
    var hp20192 = 0
    var hp20201 = 0
    var hp20202 = 0
    var hp20211 = 0
    var hp20212 = 0
    var hp20221 = 0
    var hp20222 = 0

    if(data20191.length!=0){
        p20191 = data20191[0].dik_diakui.toFixed(1)
        dp20191 = data20191[0].lit_diakui.toFixed(1)
        hp20191 = data20191[0].abdimas_diakui.toFixed(1)
    }
    if(data20192.length!=0){
        p20192 = data20192[0].dik_diakui.toFixed(1)
        dp20192 = data20192[0].lit_diakui.toFixed(1)
        hp20192 = data20192[0].abdimas_diakui.toFixed(1)
    }
    if(data20201.length!=0){
        p20201 = data20201[0].dik_diakui.toFixed(1)
        dp20201 = data20201[0].lit_diakui.toFixed(1)
        hp20201 = data20201[0].abdimas_diakui.toFixed(1)
    }
    if(data20202.length!=0){
        p20202 = data20202[0].dik_diakui.toFixed(1)
        dp20202 = data20202[0].lit_diakui.toFixed(1)
        hp20202 = data20202[0].abdimas_diakui.toFixed(1)
    }
    if(data20211.length!=0){
        p20211 = data20211[0].dik_diakui.toFixed(1)
        dp20211 = data20211[0].lit_diakui.toFixed(1)
        hp20211 = data20211[0].abdimas_diakui.toFixed(1)
    }
    if(data20212.length!=0){
        p20212 = data20212[0].dik_diakui.toFixed(1)
        dp20212 = data20212[0].lit_diakui.toFixed(1)
        hp20212 = data20212[0].abdimas_diakui.toFixed(1)
    }
    if(data20221.length!=0){
        p20221 = data20221[0].dik_diakui.toFixed(1)
        dp20221 = data20221[0].lit_diakui.toFixed(1)
        hp20221 = data20221[0].abdimas_diakui.toFixed(1)
    }
    if(data20222.length!=0){
        p20222 = data20222[0].dik_diakui.toFixed(1)
        dp20222 = data20222[0].lit_diakui.toFixed(1)
        hp20222 = data20222[0].abdimas_diakui.toFixed(1)
    }
    // console.log(p20201)
    const performa = {
        series: [          {
            name: "Dharma 1",
            data: [p20191, p20192, p20201, p20202, p20211, p20212, p20221,p20222]
          },
          {
            name: "Dharma 2",
            data: [dp20191, p20192, dp20201, dp20202, dp20211, dp20212, dp20221,dp20222]
          },
          {
            name: "Dharma 3",
            data: [hp20191, hp20192, hp20201, hp20202, hp20211, hp20212, hp20221,hp20222]
          }],
          options: {
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['#324B4F','#79B5BE','#BEB4D4'],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Grafik Kinerja',
                align: 'left'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: [ 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                size: 1
              },
              xaxis: {
                categories: ['2019 (Ganjil)', '2019 (Genap)', '2020 (Ganjil)', '2020 (Genap)', '2021 (Ganjil)', '2021 (Genap)', '2022 (Ganjil)',"2022 (Genap)"],
                title: {
                  text: 'Periode'
                }
              },
              yaxis: {
                title: {
                  text: 'Dharma'
                },
                min: 0,
                max: 30
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
          },
    }
    return (
        <div>
        { data20211.length!=0 &&
            <div>
                <div className='row'>
                    <div className="col-7">
                        <div className="card">
                            <div className="card__body">
                                <h2>Profil Dosen {props.match.params.id}</h2>
                                <table>
                                    <tr>
                                        <td>KODE DOSEN</td>
                                        <td>: {data20211[0].kode_nama}</td>
                                    </tr>
                                    <tr>
                                        <td>KODE</td>
                                        <td>: {data20211[0].kode}</td>
                                    </tr>
                                    <tr>
                                        <td>JFA</td>
                                        <td>: {data20211[0].jfa}</td>
                                    </tr>
                                    <tr>
                                        <td>PENDIDIKAN</td>
                                        <td>: {data20211[0].pendidikan_terakhir}</td>
                                    </tr>
                                    <tr>
                                        <td>KELOMPOK KEAHLIAN</td>
                                        <td>: {data20211[0].kelompok_keahlian}</td>
                                    </tr>
                                    <tr>
                                        <td>PROGRAM STUDI</td>
                                        <td>: {data20211[0].program_studi}</td>
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
                                        <td>Dharma </td>
                                        <td>Penunjang</td>
                                    </tr>
                                    {data20191.length!=0 &&
                                    <tr>
                                        <td>2019 (Ganjil)</td>
                                        <td>{data20191[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20191[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20191[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20191[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20192.length!=0 &&
                                    <tr>
                                        <td>2019 (Genap)</td>
                                        <td>{data20192[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20192[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20192[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20192[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20201.length!=0 &&
                                    <tr>
                                        <td>2020 (Ganjil)</td>
                                        <td>{data20201[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20201[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20201[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20201[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20202.length!=0 &&
                                    <tr>
                                        <td>2020 (Genap)</td>
                                        <td>{data20202[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20202[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20202[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20202[0].penunjang.toFixed(1)}</td>
                                    </tr>
}

                                    {data20211.length!=0 &&
                                    <tr>
                                        <td>2021 (Ganjil)</td>
                                        <td>{data20211[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20211[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20211[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20211[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20212.length!=0 &&
                                    <tr>
                                        <td>2021 (Genap)</td>
                                        <td>{data20212[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20212[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20212[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20212[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20221.length!=0 &&
                                    <tr>
                                        <td>2022 (Ganjil)</td>
                                        <td>{data20221[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20221[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20221[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20221[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
                                    {data20222.length!=0 &&
                                    <tr>
                                        <td>2022 (Genap)</td>
                                        <td>{data20222[0].dik_diakui.toFixed(1)}</td>
                                        <td>{data20222[0].lit_diakui.toFixed(1)}</td>
                                        <td>{data20222[0].abdimas_diakui.toFixed(1)}</td>
                                        <td>{data20222[0].penunjang.toFixed(1)}</td>
                                    </tr>
}
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
                                    <ReactApexChart
                                        options={themeReducer === 'theme-mode-dark' ? {
                                            ...performa.options,
                                            theme: { mode: 'dark'}
                                        } : {
                                            ...performa.options,
                                            theme: { mode: 'light'}
                                        }}
                                        series={performa.series}
                                        type='line'
                                        height='350'
                                    />
 
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