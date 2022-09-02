import React, { useState, useEffect} from 'react'
import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

function Cluster() {
    
    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    const [dataList, setDataList] = useState([])
    const [dataList0, setDataList0] = useState([])
    const [dataList1, setDataList1] = useState([])
    const [dataList2, setDataList2] = useState([])
    const [periode, setPeriode] = useState("Genap_2019")
    


    
          
    useEffect(() => {
        Axios.get('http://34.101.42.148:3001/api/get-cluster/'+periode).then((response) => {
            setDataList(response.data);
        });
        Axios.get('http://34.101.42.148:3001/api/get-cluster/'+periode+'/0').then((response) => {
            setDataList0(response.data);
        });
        Axios.get('http://34.101.42.148:3001/api/get-cluster/'+periode+'/1').then((response) => {
            setDataList1(response.data);
        });
        Axios.get('http://34.101.42.148:3001/api/get-cluster/'+periode+'/2').then((response) => {
            setDataList2(response.data);
        });
    }, [periode]);

    const customerTableHead = [
        'KODE NAMA',
        'PROGRAM STUDI',
        'STATUS KEPEGAWAIAN',
        'JFA',
        'DHARMA 1',
        'DHARMA 2',
        'DHARMA 3'
      ]

    const renderHead = (item, index) => <th key={index}>{item}</th>
          
    const renderBody = (item, index) => (
          <tr key={index}>
            <Link to={"User/"+item.kode_nama} key={index}>
              <td>{item.kode_nama}</td>
            </Link>
            <td>{item.program_studi}</td>
            <td>{item.status_kepegawaian}</td>
            <td>{item.jfa}</td>
            <td>{item.dik_diakui.toFixed(2)}</td>
            <td>{item.lit_diakui.toFixed(2)}</td>
            <td>{item.abdimas_diakui.toFixed(2)}</td>
        </tr>
    )

    var value0 = []
    var value1 = []
    var value2 = []

    if (dataList0.length!=0){
        dataList0.map((data, index) =>{
            value0[index]=[data["PC1_2d"], data["PC2_2d"].toFixed(2)]
        })
    }
    if (dataList1.length!=0){
        for (var i in dataList1){
            value1[i]=[dataList1[i]["PC1_2d"], dataList1[i]["PC2_2d"].toFixed(2)]
        }
    }
    if (dataList2.length!=0){
        for (var i in dataList2){
            value2[i]=[dataList2[i]["PC1_2d"], dataList2[i]["PC2_2d"].toFixed(2)]
        }
    }

    const scatterCluster = {
        series: [{
            name: "Cluster 0",
            data: value0
          },{
            name: "Cluster 1",
            data: value1
          },{
            name: "Cluster 2",
            data: value2
          }],
          options: {
            chart: {
              height: 350,
              type: 'scatter',
              zoom: {
                enabled: true,
                type: 'xy'
              }
            },
            xaxis: {
              tickAmount: 10,
              labels: {
                formatter: function(val) {
                  return parseFloat(val).toFixed(1)
                }
              }
            },
            yaxis: {
              tickAmount: 7
            }
          },
    }
var pegawai_tetap = 0
var pegawai_calonpegawaitetap = 0
var pegawai_profulltime = 0
var pegawai_proparttime = 0

var cluster0 = 0
var cluster1 = 0
var cluster2 = 0


if (dataList.length!=0){
    for (var i in dataList){
        // console.log(dataList["status_kepegawaian"])
        if (dataList[i]["cluster"]=="0")
        // console.log("mashok")
        cluster0 = cluster0 + 1

        if (dataList[i]["cluster"]=="1")
        // console.log("mashok2")
        cluster1 = cluster1 + 1

        if (dataList[i]["cluster"]=="2")
        // console.log("mashok1")
        cluster2 = cluster2 + 1



    }

}
// console.log(pegawai_tetap)
// console.log(pegawai_profulltime)
// console.log(pegawai_proparttime)
// console.log(pegawai_calonpegawaitetap)

const cluster = {
    series: [{
        data: [cluster0, cluster1, cluster2]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 100
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            dataLabels: {
                position: 'top',
              }
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: ['cluster0', 'cluster1', 'cluster2'
          ],
        },
        tooltip: {
            x: {
              formatter: function (val) {
                return val 
              }
            }
          },
      }
}

var c0d1 = 0
var c0d2 = 0
var c0d3 = 0
var c0p = 0
var c1d1 = 0
var c1d2 = 0
var c1d3 = 0
var c1p = 0
var c2d1 = 0
var c2d2 = 0
var c2d3 = 0
var c2p = 0



// if (dataList.length!=0){
//     for (var i in dataList){
//         // console.log(dataList["status_kepegawaian"])
//         if (dataList1[i]["cluster"]==0)
//         c0d1 = c0d1 + dataList1[i]["dik_diakui"]
//         c0d2 = c0d2 + dataList1[i]["lit_diakui"]
//         c0d3 = c0d3 + dataList1[i]["abdimas_diakui"]
//         c0p = c0p + dataList1[i]["penunjang"]
//         if (dataList1[i]["cluster"]==1)
//         c1d1 = c0d1 + dataList1[i]["dik_diakui"]
//         c1d2 = c0d2 + dataList1[i]["lit_diakui"]
//         c1d3 = c0d3 + dataList1[i]["abdimas_diakui"]
//         c1p = c0p + dataList1[i]["penunjang"]
//         if (dataList1[i]["cluster"]==2)
//         c2d1 = c0d1 + dataList1[i]["dik_diakui"]
//         c2d2 = c0d2 + dataList1[i]["lit_diakui"]
//         c2d3 = c0d3 + dataList1[i]["abdimas_diakui"]
//         c2p = c0p + dataList1[i]["penunjang"]





//     }

// }



    return (
        <div>
            <div className='row'>
                <div className="col-6">
                    <h2>Hasil Cluster Periode:</h2>
                </div>
                <div className="col-6">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            {periode}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2021")}>2021 - Genap</button></li>
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2021")}>2021 - Ganjil</button></li>
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2020")}>2020 - Genap</button></li>
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2020")}>2020 - Ganjil</button></li>
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2019")}>2019 - Genap</button></li>
                            <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2019")}>2019 - Ganjil</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <br></br>
            {dataList.length!=0 && 
            <div>
            
            <div className="row">
            <div className="col-12">
                {/* <div className="card full-height min-height-500"> */}
                <div className="card__body">
                       <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...scatterCluster.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...scatterCluster.options,
                                theme: { mode: 'light'}
                            }}
                            series={scatterCluster.series}
                            type='scatter'
                            height='350'
                        />
                </div>
            </div>
            </div>
            </div>
}
            <div>
            {dataList1.length!=0 &&
                <div>
                    <h1>Jumlah Dosen Tiap Cluster</h1>
                    <div className="row">
                        <div className="col-5">
                            <div className="card">
                                <div className="card__body">
                                <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...cluster.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...cluster.options,
                                theme: { mode: 'light'}
                            }}
                            series={cluster.series}
                            type='bar'
                            height='350'
                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {dataList0.length!=0 &&
                <div>
                    <h1>Cluster 0</h1>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card__body height-300">
                                    <Table
                                        limit='9999'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}

                                        bodyData={dataList0}
                                        renderBody={(item, index) => renderBody(item, index)} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {dataList1.length!=0 &&
                <div>
                    <h1>Cluster 1</h1>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card__body height-300">
                                    <Table
                                        limit='9999'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}

                                        bodyData={dataList1}
                                        renderBody={(item, index) => renderBody(item, index)} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
 {dataList2.length!=0 &&
                <div>
                    <h1>Cluster 2</h1>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card__body height-300">
                                    <Table
                                        limit='9999'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}

                                        bodyData={dataList2}
                                        renderBody={(item, index) => renderBody(item, index)} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            {/* } */}
        </div>
        
    );

}

export default Cluster