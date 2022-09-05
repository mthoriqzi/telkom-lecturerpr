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
    const [data20191, setData20191] = useState([])
    const [data20192, setData20192] = useState([])
    const [data20201, setData20201] = useState([])
    const [data20202, setData20202] = useState([])
    const [data20211, setData20211] = useState([])
    const [data20212, setData20212] = useState([])
    const [data20221, setData20221] = useState([])
    const [data20222, setData20222] = useState([])
    const [periode, setPeriode] = useState("Ganjil_2020")
    const [kelompok_keahlian, setkelompokKeahlian] = useState('All')
    const [program_studi, setProgramStudi] = useState('All')
    const [jfa, setJFA] = useState('All')
    const [dataFilter, setDataFilter] = useState()

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
    
    Axios.get("http://34.101.42.148:3001/api/get/Genap_2019/").then((response) => {
        setData20192(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2020/").then((response) => {
        setData20201(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Genap_2020/").then((response) => {
        setData20202(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2021/").then((response) => {
        setData20211(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Genap_2021/").then((response) => {
        setData20212(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2022/").then((response) => {
        setData20221(response.data);

    });
    Axios.get("http://34.101.42.148:3001/api/get/Genap_2022/").then((response) => {
        setData20222(response.data);
});

    }, [periode, dataList0]);

    const customerTableHead = [
        'KODE NAMA',
        'KODE',
        'NO URUT',
        'PENDIDIKAN TERAKHIR',
        'KELOMPOK KEAHLIAN',
        'INPASSING',
        'SERTIFIKASI',
        'PROGRAM STUDI',
        'STATUS KEPEGAWAIAN',
        'JFA',
        'DIK DIAKUI',
        'LIT DIAKUI',
        'ABDIMAS DIAKUI',
        'PENUNJANG',
        'PROF DIAKUI',
        'TOTAL SKS',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>
          
    const renderBody = (item, index) => (
          <tr key={index}>
            <Link to={"User/"+item.kode_nama} key={index}>
              <td>{item.kode_nama}</td>
            </Link>
          <td>{item.kode}</td>
          <td>{item.no_urut}</td>
          <td>{item.pendidikan_terakhir}</td>
          <td>{item.kelompok_keahlian}</td>
          <td>{item.inpassing}</td>
          <td>{item.sertifikasi}</td>
          <td>{item.program_studi}</td>
          <td>{item.status_kepegawaian}</td>
          <td>{item.jfa}</td>
          <td>{item.dik_diakui.toFixed(2)}</td>
          <td>{item.lit_diakui.toFixed(2)}</td>
          <td>{item.abdimas_diakui.toFixed(2)}</td>
          <td>{item.penunjang.toFixed(2)}</td>
          <td>{item.prof_diakui}</td>
          <td>{item.total_sks.toFixed(2)}</td>
       
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
            colors: ['#324B4F','#79B5BE','#BEB4D4'],
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
        colors: ['#79B5BE','#BEB4D4'],
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: ['cluster0', 'cluster1', 'cluster2'
          ],
          colors: ['#324B4F','#79B5BE','#BEB4D4'],
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

//     const handleRemoveItem = name => {
//         setDataList0(dataList0.filter(item => item.kode_nama !== name))
//         setkelompokKeahlian("c")
//         console.log(dataList0[0].kode_nama)
//     }

function filterData(data){
    var i=0
    for (i; i<data.length; i++){
        <div>{data[i].kode_nama}</div>
        
    }
}
// const renderfilterBody = (item) => (
//     <tr>
//         <td>KODE DOSEN</td>
//         <td>KODE</td>
//         </tr>
// )
function filterby(cluster){
    let data=dataList0
    // setDataList0(dataList0)
    // if(cluster==1){
    //     setDataFilter(dataList1)
    // }else if(cluster==2){
    //     setDataFilter(dataList2)
    // }
    if(kelompok_keahlian!='All'){
        // setDataList0(dataList0.filter(item => {return item.kelompok_keahlian === kelompok_keahlian}))
        // setDataList0(dataList1)
    }
    // if(program_studi!='All'){
    //     setDataFilter(dataFilter.filter(item => item.program_studi === program_studi))
    // }
    // if(jfa!='All'){
    //     setDataFilter(dataFilter.filter(item => item.jfa === jfa))
    // }
    // setDataFilter(dataFilter)
    return(
        <div>
            <div class="input-group">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Kelompok Keahlian: {kelompok_keahlian}</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={() => setkelompokKeahlian("All")}>All</a></li>
                    <li><a class="dropdown-item" onClick={() => setkelompokKeahlian("ENGINEERING MANAGEMENT SYSTEM")}>ENGINEERING MANAGEMENT SYSTEM</a></li>
                    <li><a class="dropdown-item" onClick={() => setkelompokKeahlian("ENTERPRISE AND INDUSTRIAL SYSTEM")}>ENTERPRISE AND INDUSTRIAL SYSTEM</a></li>
                    <li><a class="dropdown-item" onClick={() => setkelompokKeahlian("CYBERNETICS")}>CYBERNETICS</a></li>
                    <li><a class="dropdown-item" onClick={() => setkelompokKeahlian("PRODUCTION AND MANUFACTURING SYSTEM")}>PRODUCTION AND MANUFACTURING SYSTEM</a></li>
                </ul>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Program Studi: {program_studi}</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={() => setProgramStudi("All")}>All</a></li>
                    <li><a class="dropdown-item" onClick={() => setProgramStudi("PRODI S2 TEKNIK INDUSTRI (FRI) (2019)")}>PRODI S2 TEKNIK INDUSTRI (FRI) (2019)</a></li>
                    <li><a class="dropdown-item" onClick={() => setProgramStudi("PRODI S1 TEKNIK INDUSTRI (FRI) (2019)")}>PRODI S1 TEKNIK INDUSTRI (FRI) (2019)</a></li>
                    <li><a class="dropdown-item" onClick={() => setProgramStudi("PRODI S1 SISTEM INFORMASI (FRI) (2019)")}>PRODI S1 SISTEM INFORMASI (FRI) (2019)</a></li>
                    <li><a class="dropdown-item" onClick={() => setProgramStudi("PRODI S1 TEKNIK LOGISTIK (FRI) (2019)")}>PRODI S1 TEKNIK LOGISTIK (FRI) (2019)</a></li>
                </ul>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">JFA: {jfa}</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={() => setJFA("All")}>All</a></li>
                    <li><a class="dropdown-item" onClick={() => setJFA("LK")}>LK</a></li>
                    <li><a class="dropdown-item" onClick={() => setJFA("L")}>L</a></li>
                    <li><a class="dropdown-item" onClick={() => setJFA("AA")}>AA</a></li>
                    <li><a class="dropdown-item" onClick={() => setJFA("NJFA")}>NJFA</a></li>
                </ul>
                <button class="btn btn-primary" data-bs-target="#filterb" data-bs-toggle="modal" type="submit">Filter</button> 
            </div>

            
            <div class="modal fade" id="filterb" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Filter Cluster 0</h3>
                        </div>
                        <div class="modal-body">
                            {filterData(data)}
                            {/* {data[0].kode_nama} */}
        <table>
            <tr>
                <td>KODE DOSEN</td>
                <td>KODE</td>
            </tr>
        </table>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#hasilfilter" data-bs-toggle="modal" data-bs-dismiss="modal" type="submit">Cari</button>
                        </div>
                    </div>
                </div>
                {/* <div class="modal fade" id="hasilfilter" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        hasilfilter
                    </div>
                </div>
            </div> */}
            </div>
            
        </div>
    )

}

function rata_rata(data, dharma) {
    let jumlah = 0
    for (var item of data){
        if(dharma==1){
            jumlah+=item.dik_diakui
        }else if(dharma==2){
            jumlah+=item.lit_diakui
        }else if(dharma==3){
            jumlah+=item.abdimas_diakui
        }else if(dharma==4){
            jumlah+=item.penunjang
        }
    }
    return jumlah/data.length
}

function mindharma(data, dharma) {
    let minvalue = 999
    for (var item of data){
        if(dharma==1){
            if(minvalue>item.dik_diakui){
                minvalue=item.dik_diakui
            }
        }else if(dharma==2){
            if(minvalue>item.lit_diakui){
                minvalue=item.lit_diakui
            }
        }else if(dharma==3){
            if(minvalue>item.abdimas_diakui){
                minvalue=item.abdimas_diakui
            }
        }else if(dharma==4){
            if(minvalue>item.penunjang){
                minvalue=item.penunjang
            }
        }
    }
    return minvalue
}
function maxdharma(data, dharma) {
    let maxvalue = 0
    for (var item of data){
        if(dharma==1){
            if(maxvalue<item.dik_diakui){
                maxvalue=item.dik_diakui
            }
        }else if(dharma==2){
            if(maxvalue<item.lit_diakui){
                maxvalue=item.lit_diakui
            }
        }else if(dharma==3){
            if(maxvalue<item.abdimas_diakui){
                maxvalue=item.abdimas_diakui
            }
        }else if(dharma==4){
            if(maxvalue<item.penunjang){
                maxvalue=item.penunjang
            }
        }
    }
    return maxvalue
}


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
                    {data20212.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2021")}>2021 - Genap</button></li>
            }
            {data20211.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2021")}>2021 - Ganjil</button></li>
            }{data20202.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2020")}>2020 - Genap</button></li>
            }{data20201.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2020")}>2020 - Ganjil</button></li>
            }{data20192.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2019")}>2019 - Genap</button></li>
            }{data20191.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2019")}>2019 - Ganjil</button></li>}
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
            {dataList.length!=0 &&
                <div className='row'>
                    <div className="col-6">
                        <h2>Jumlah Dosen Tiap Cluster</h2>
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
                                    height='270'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>Analisis Cluster</h2>
                        <div className="card">
                            <div className="card__body">
                            <p>Berikut merupakan rata-rata atributdari setiap cluster. Hal ini membantu mendeskripsikan setiap cluster yang terbentuk.</p>
                                <table>
                                    <tr>
                                        <td></td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 0</td>
                                        <td>{rata_rata(dataList0, 1).toFixed(2)}</td>
                                        <td>{rata_rata(dataList0, 2).toFixed(2)}</td>
                                        <td>{rata_rata(dataList0, 3).toFixed(2)}</td>
                                        <td>{rata_rata(dataList0, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 1</td>
                                        <td>{rata_rata(dataList1, 1).toFixed(2)}</td>
                                        <td>{rata_rata(dataList1, 2).toFixed(2)}</td>
                                        <td>{rata_rata(dataList1, 3).toFixed(2)}</td>
                                        <td>{rata_rata(dataList1, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 2</td>
                                        <td>{rata_rata(dataList2, 1).toFixed(2)}</td>
                                        <td>{rata_rata(dataList2, 2).toFixed(2)}</td>
                                        <td>{rata_rata(dataList2, 3).toFixed(2)}</td>
                                        <td>{rata_rata(dataList2, 4).toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>Minimal Nilai</h2>
                        <div className="card">
                            <div className="card__body">
                            <p>Berikut meripakan nilai minimal atribut dari setiap cluster.</p>
                                <table>
                                    <tr>
                                        <td></td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 0</td>
                                        <td>{mindharma(dataList0, 1).toFixed(2)}</td>
                                        <td>{mindharma(dataList0, 2).toFixed(2)}</td>
                                        <td>{mindharma(dataList0, 3).toFixed(2)}</td>
                                        <td>{mindharma(dataList0, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 1</td>
                                        <td>{mindharma(dataList1, 1).toFixed(2)}</td>
                                        <td>{mindharma(dataList1, 2).toFixed(2)}</td>
                                        <td>{mindharma(dataList1, 3).toFixed(2)}</td>
                                        <td>{mindharma(dataList1, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 2</td>
                                        <td>{mindharma(dataList2, 1).toFixed(2)}</td>
                                        <td>{mindharma(dataList2, 2).toFixed(2)}</td>
                                        <td>{mindharma(dataList2, 3).toFixed(2)}</td>
                                        <td>{mindharma(dataList2, 4).toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h2>Maksimal Nilai</h2>
                        <div className="card">
                            <div className="card__body">
                            <p>Berikut merupakan nilai maksimal atribut dari setiap cluster.</p>
                                <table>
                                    <tr>
                                        <td></td>
                                        <td>Dharma 1</td>
                                        <td>Dharma 2</td>
                                        <td>Dharma 3</td>
                                        <td>Penunjang</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 0</td>
                                        <td>{maxdharma(dataList0, 1).toFixed(2)}</td>
                                        <td>{maxdharma(dataList0, 2).toFixed(2)}</td>
                                        <td>{maxdharma(dataList0, 3).toFixed(2)}</td>
                                        <td>{maxdharma(dataList0, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 1</td>
                                        <td>{maxdharma(dataList1, 1).toFixed(2)}</td>
                                        <td>{maxdharma(dataList1, 2).toFixed(2)}</td>
                                        <td>{maxdharma(dataList1, 3).toFixed(2)}</td>
                                        <td>{maxdharma(dataList1, 4).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Cluster 2</td>
                                        <td>{maxdharma(dataList2, 1).toFixed(2)}</td>
                                        <td>{maxdharma(dataList2, 2).toFixed(2)}</td>
                                        <td>{maxdharma(dataList2, 3).toFixed(2)}</td>
                                        <td>{maxdharma(dataList2, 4).toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {dataList0.length!=0 &&
                <div>
                    <h1>Cluster 0</h1>
                    {filterby(0)}
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
                    <h2>Cluster 1</h2>
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
                    <h2>Cluster 2</h2>
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