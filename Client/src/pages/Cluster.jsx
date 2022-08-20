import React, { useState, useEffect} from 'react'
import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import HasilCluster from '../components/hasilcluster/HasilCluster';
// import App from "./App";
import ReactApexChart from 'react-apexcharts';
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'




function Cluster() {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
//     class ApexChart extends React.Component {
//         constructor(props) {
//           super(props);

//           this.state = {
          
//             series: [{
//               name: "Cluster 0",
//               data: [dataList0["PC1_2d"],dataList0["PC2_2d"]
//               ]
//             },{
//               name: "Cluster 1",
//               data: [
//               [1.4, 3.4]]
//             },{
//               name: "Cluster 2",
//               data: [
//               [21.7, 3]]
//             }],
//             options: {
//               chart: {
//                 height: 350,
//                 type: 'scatter',
//                 zoom: {
//                   enabled: true,
//                   type: 'xy'
//                 }
//               },
//               xaxis: {
//                 tickAmount: 10,
//                 labels: {
//                   formatter: function(val) {
//                     return parseFloat(val).toFixed(1)
//                   }
//                 }
//               },
//               yaxis: {
//                 tickAmount: 7
//               }
//             },
          
          
//           };
//         }

//         render() {
//             return (
              
  
//         <div id="chart">
//     <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" height={350} />
//   </div>
//             );
//         }
//       }
    // const domContainer = document.querySelector('#app');

    const [clusterList, setClusterList] = useState([])
    const [dataList, setDataList] = useState([])
    const [dataList0, setDataList0] = useState([])
    const [dataList1, setDataList1] = useState([])
    const [dataList2, setDataList2] = useState([])
    
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-cluster').then((response) => {
            setDataList(response.data);
        });
        Axios.get('http://localhost:3001/api/get-cluster-0',{ mode: 'cors' }).then((response) => {
            setDataList0(response.data);
        });
        Axios.get('http://localhost:3001/api/get-cluster-1').then((response) => {
            setDataList1(response.data);
        });
        Axios.get('http://localhost:3001/api/get-cluster-2').then((response) => {
            setDataList2(response.data);
        });
        
        //   dataList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);

    // useEffect(() => {
    //     Axios.get('http://localhost:3001/api/get-cluster-0',{ mode: 'cors' }).then((response) => {
    //         setDataList0(response.data);
    //     });
        //   dataList0.setHeader("Access-Control-Allow-Origin", "*");
    // }, []);
    // useEffect(() => {

    //     //   dataList1.setHeader("Access-Control-Allow-Origin", "*");
    // }, []);
    // useEffect(() => {

    //     //   dataList2.setHeader("Access-Control-Allow-Origin", "*");
    // }, []);

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
    // for (var i in dataList0.length){
    //     value0[i]=[dataList0["PC1_2d"][i], dataList0["PC2_2d"][i]]
    // }
    console.log(typeof(dataList))
    if (dataList0.length!=0){
        // console.log(dataList0)
        dataList0.map((data, index) =>{
            value0[index]=[data["PC1_2d"], data["PC2_2d"].toFixed(2)]
        })

    }
    // console.log(value0)
    if (dataList1.length!=0){
        for (var i in dataList1){
            value1[i]=[dataList1[i]["PC1_2d"], dataList1[i]["PC2_2d"].toFixed(2)]
        }

    }
    // console.log(value1)
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

    // useEffect(() => {
    //   Axios.get('http://127.0.0.1:5000').then((response) => {
    //     setClusterList(response.data);
    //   });
    // //   clusterList.setHeader("Access-Control-Allow-Origin", "*");
    // }, []);
    // console.log(clusterList)
    
    return (
        // ReactDOM.render(React.createElement(ApexChart), document.getElementById('root')),
        <div>
            
            {/* <div id="scatter"></div> */}
            {/* {dataList.length!=0 &&
            <div>
                <ScatterChart width={400} height={400}>
                <CartesianGrid />
                <XAxis type="string" dataKey="kode_nama" />
                <YAxis type="number" dataKey="cluster" />
                <Scatter post={dataList} fill="green" />
                </ScatterChart>
            </div>
            } */}
            <h2>Hasil Cluster Periode:</h2>
            <br></br>
            {dataList0.length!=0 & dataList1.length!=0 & dataList2.length!=0 && 
            <div>
            
            <div className="row">
            <div className="col-12">
                {/* <div className="card full-height min-height-500"> */}
                <div className="card__body">
               
                        {/* chart */}
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
            {dataList0.length!=0 & dataList1.length!=0 & dataList2.length!=0 && 
            <div>
                
                <h1>Cluster 0</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='7'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}

                                    bodyData={dataList0}
                                    renderBody={(item, index) => renderBody(item, index)} />

                            </div>
                        </div>
                    </div>
                </div>
                <h1>Cluster 1</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='7'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}

                                    bodyData={dataList1}
                                    renderBody={(item, index) => renderBody(item, index)} />

                            </div>
                        </div>
                    </div>
                </div>
                <h1>Cluster 2</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='7'
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
        
    );

}

export default Cluster