import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import Table from '../components/table/Table'
import Axios from 'axios';
import { Link } from 'react-router-dom'

function Data() {
 
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

  const sendToDB = (data) => {
    Axios.post("http://localhost:3001/api/insert", {
      "data": data
    });
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]])
      // console.log(JSON.stringify(data), "\n\n");
      sendToDB(data);
      // processData(data);
    };
    reader.readAsBinaryString(file);
  }

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
      <h3>MASTER DATA</h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      
      {dataList.length!=0 &&
      <div className="row">
          <div className="col-12">
              <div className="card">
                  <div className="card__body">
                      <Table
                          limit='10'
                          headData={customerTableHead}
                          renderHead={(item, index) => renderHead(item, index)}
                         
                          bodyData = {dataList}
                          renderBody={(item, index) => renderBody(item, index)}
                          
                       />
                    
                  </div>
              </div>
          </div>
      </div>
      }
    </div>
  );
}
 
export default Data;