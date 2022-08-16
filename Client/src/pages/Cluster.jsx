import React, { useState, useEffect} from 'react'
import Table from '../components/table/Table'
import { Link } from 'react-router-dom'
import Axios from 'axios';

const Cluster = () => {
    const [dataList, setDataList] = useState([])
    
    useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) => {
        setDataList(response.data);
      });
    }, []);

    const customerTableHead = [
        'NO',
        'KODE NAMA',
        'KODE',
        'NO URUT',
        'PROGRAM STUDI',
        'STATUS KEPEGAWAIAN',
        'JFA',
        'DIK DIAKUI',
        'LIT DIAKUI',
        'ABDIMAS DIAKUI',
        'PENUNJANG',
        'PROF DIAKUI',
        'TOTAL SKS',
        'PEMENUHAN TRIDHARMA'
      ]

    const renderHead = (item, index) => <th key={index}>{item}</th>
          
    const renderBody = (item, index) => (
    
          <tr key={index}>
            <td>{item.no}</td>
            <Link to={"User/"+item.kode_nama} key={index}>
              <td>{item.kode_nama}</td>
            </Link>
            <td>{item.kode}</td>
            <td>{item.no_urut}</td>
            <td>{item.program_studi}</td>
            <td>{item.status_kepegawaian}</td>
            <td>{item.jfa}</td>
            <td>{item.dik_diakui}</td>
            <td>{item.lit_diakui}</td>
            <td>{item.abdimas_diakui}</td>
            <td>{item.penunjang}</td>
            <td>{item.prof_diakui}</td>
            <td>{item.total_sks}</td>
            <td>{item.pemenuhan_tridarma}</td>
        </tr>
    )
  
    return (
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
                         
                          bodyData = {dataList}
                          renderBody={(item, index) => renderBody(item, index)}
                          
                       />
                    
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
                         
                          bodyData = {dataList}
                          renderBody={(item, index) => renderBody(item, index)}
                          
                       />
                    
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
                         
                          bodyData = {dataList}
                          renderBody={(item, index) => renderBody(item, index)}
                          
                       />
                    
                  </div>
              </div>
            </div>
            </div>
        </div>
    )
}

export default Cluster