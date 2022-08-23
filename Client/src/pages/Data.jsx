import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import Table from '../components/table/Table'
import Axios from 'axios';
import { Link } from 'react-router-dom'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

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

  const sendToDB = (data, periode) => {
    Axios.post("http://localhost:3001/api/insert", {
      "data": data
    ,"periode":periode});
    const flask = "http://localhost:5000/api/"+periode
    // console.log(flask)
    Axios.get(flask, 'GET')
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      // data.push(wb.SheetNames[0])
      // console.log(data[data.length-2]);
      sendToDB(data,wb.SheetNames[0]);
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
          <td>{item.dik_diakui.toFixed(2)}</td>
          <td>{item.lit_diakui.toFixed(2)}</td>
          <td>{item.abdimas_diakui.toFixed(2)}</td>
          <td>{item.penunjang.toFixed(2)}</td>
          <td>{item.prof_diakui}</td>
          <td>{item.total_sks.toFixed(2)}</td>
          <td>{item.pemenuhan_tridarma}</td>
      </tr>
  )

  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <h3>MASTER DATA</h3>
        </div>
        <div className='col-3'>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Pilih Periode
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item" type="button">2022 - Genap</button></li>
              <li><button class="dropdown-item" type="button">2022 - Ganjil</button></li>
              <li><button class="dropdown-item" type="button">2021 - Genap</button></li>
              <li><button class="dropdown-item" type="button">2021 - Ganjil</button></li>
              <li><button class="dropdown-item" type="button">2020 - Genap</button></li>
              <li><button class="dropdown-item" type="button">2020 - Ganjil</button></li>
              <li><button class="dropdown-item" type="button">2019 - Genap</button></li>
              <li><button class="dropdown-item" type="button">2019 - Ganjil</button></li>
            </ul>
          </div>
        </div>
        <div className='col-3'>  
          {/* <button style="display:block;width:120px; height:30px;" onclick="document.getElementById('getFile').click()">Input Data Periode</button> */}
          <input
            // id="getFile"
            // placeholder="Enter a tag"
            type="file"
            // style="display:none"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      
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