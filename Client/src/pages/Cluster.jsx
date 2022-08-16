import React, { useState, useEffect} from 'react'
import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import HasilCluster from '../components/hasilcluster/HasilCluster';

function Cluster() {
 
    const [clusterList, setClusterList] = useState([])
    const [dataList, setDataList] = useState([])
    const [dataList0, setDataList0] = useState([])
    const [dataList1, setDataList1] = useState([])
    const [dataList2, setDataList2] = useState([])
    
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-cluster').then((response) => {
            setDataList(response.data);
        });
        //   dataList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-cluster-0').then((response) => {
            setDataList0(response.data);
        });
        //   dataList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-cluster-1').then((response) => {
            setDataList1(response.data);
        });
        //   dataList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get-cluster-2').then((response) => {
            setDataList2(response.data);
        });
        //   dataList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);

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
            <td>{item.dik_diakui}</td>
            <td>{item.lit_diakui}</td>
            <td>{item.abdimas_diakui}</td>
        </tr>
    )

    // useEffect(() => {
    //   Axios.get('http://127.0.0.1:5000').then((response) => {
    //     setClusterList(response.data);
    //   });
    // //   clusterList.setHeader("Access-Control-Allow-Origin", "*");
    // }, []);
    // console.log(clusterList)
    
    return (
        
        <div>
            {dataList.length!=0 &&
            <div>
                <ScatterChart width={400} height={400}>
                <CartesianGrid />
                <XAxis type="string" dataKey="kode_nama" />
                <YAxis type="number" dataKey="cluster" />
                <Scatter post={dataList} fill="green" />
                </ScatterChart>
            </div>
            }
            {dataList0.length!=0 & dataList1.length!=0 & dataList2.length!=0 && 
            <div>
                <h2>Hasil Cluster Periode:</h2>
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