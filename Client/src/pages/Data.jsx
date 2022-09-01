import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import Table from '../components/table/Table'
import Axios from 'axios';
import { Link } from 'react-router-dom'
// import Login from "../pages/Login"

function Data({token}) {
  // const token="test123"
  const [dataList, setDataList] = useState([])
  const [jumlah, setJumlah] = useState(0)
  const [periode, setPeriode] = useState("Genap_2019")
  const [inputs, setInputs] = useState({
    no: "",
    kode_nama: "",
    kode: "",
    no_urut: "",
    pendidikan_terakhir: "",
    kelompok_keahlian: "",
    inpassing: "",
    sertifikasi: "",
    program_studi: "",
    status_kepegawaian: "",
    jfa: "",
    dik_diakui: "",
    lit_diakui: "",
    abdimas_diakui: "",
    penunjang: "",
    prof_diakui: "",
    total_sks: "",
    pemenuhan_tridarma: ""
  })

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get/'+periode).then((response) => {
      setDataList(response.data);
    });
  }, [periode]);
  // console.log(dataList.length)
  const customerTableHead = [
    'NO',
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
    'PEMENUHAN TRIDHARMA'
  ]
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const sendToDB = (data, periode) => {
    Axios.post("http://localhost:3001/api/insert", {
      "data": data,
      "periode":periode});
    const flask = "http://localhost:4999/api/"+periode
    delay(1000).then(() => Axios.get(flask, 'GET') );
  }

  const sendToDBindividu = (data, periode) => {
    Axios.post("http://localhost:3001/api/insert/individu", {
      "data": data,
      "periode":periode});
    const flask = "http://localhost:4999/api/"+periode
    delay(1000).then(() => Axios.get(flask, 'GET') );
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      // console.log(data)
      sendToDB(data,wb.SheetNames[0]);
    };
    reader.readAsBinaryString(file);
  }

  const renderHead = (item, index) => <th key={index}>{item}</th>
          
  const renderBody = (item, index) => (
  
        <tr key={index} onChange={handleChange}>
          <td>{item.no}</td>
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
          <td>{item.pemenuhan_tridarma}</td>
          <td>Edit</td>
          <td><button value={item.kode_nama} onClick={() => handleRemoveItem(item.kode_nama)}>Delete</button></td>
          {/* <td><button value={item.kode_nama} onChange={handleChange} >Delete</button></td> */}
      </tr>
  )

  const changeHandle = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const submitHandle = e => {
    e.preventDefault()
    // console.log(inputs)
    sendToDBindividu(inputs,periode);
  }

  function deleteData(kode_nama) {
    const data = dataList.filter(person => person.kode_nama != kode_nama)
    // setDataList({data
    // });
    
    
    // if()

    console.log()
  }

  function handleChange(e) {
    console.log(dataList.length)
    setJumlah(jumlah+1)
    // setDataList(dataList.filter(item => item.kode_nama !== e.target.value));
    
  }
  const handleRemoveItem = name => {
    // setDataList(dataList.filter(item => item.kode_nama !== name))
    // console.log(dataList.length)
    Axios.post("http://localhost:3001/api/delete", {
      "data": name,
      "periode":periode});
}
//  console.log(token)
  return (
    
    <div>
      <div className='row'>
        <div className='col-3'>
          <h3>MASTER DATA {jumlah}</h3>
        </div>
        {/* Pilih Periode */}
        <div className='col-3'>
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
        {/* Input File */}
        {token.token==="test123" &&
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
}
        {/* Input Data Individu */}
        {token.token==="test123" &&
        <form className='col-3' onSubmit={submitHandle}>
          <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel">Input Data Individu</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Kode Nama</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="kode_nama"
                        value={inputs.kode_nama}
                        onChange={changeHandle}
                        placeholder="Kode Nama"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Kode</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text" 
                        class="form-control" 
                        id="colFormLabel" 
                        name="kode"
                        value={inputs.kode}
                        onChange={changeHandle}
                        placeholder="Kode"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Pendidikan Terakhir</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text" 
                        class="form-control" 
                        id="colFormLabel" 
                        name="Pendidikan Terakhir"
                        value={inputs.pendidikan_terakhir}
                        onChange={changeHandle}
                        placeholder="Pendidikan Terakhir"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Kelompok Keahlian</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text" 
                        class="form-control" 
                        id="colFormLabel" 
                        name="Kelompok Keahlian"
                        value={inputs.kelompok_keahlian}
                        onChange={changeHandle}
                        placeholder="Kelompok Keahlian"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Program Studi</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text" 
                        class="form-control" 
                        id="colFormLabel"
                        name="program_studi"
                        value={inputs.program_studi}
                        onChange={changeHandle}
                        placeholder="Program Studi"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Status Kepegawaian</label>
                    <div class="col-sm-8">
                      <input 
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="status_kepegawaian"
                        value={inputs.status_kepegawaian}
                        onChange={changeHandle}
                        placeholder="Status Kepegawaian"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Inpassing</label>
                    <div class="col-sm-8">
                      <input
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="Inpassing"
                        value={inputs.inpassing}
                        onChange={changeHandle}
                        placeholder="Inpassing"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Sertifikasi</label>
                    <div class="col-sm-8">
                      <input
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="Sertifikasi"
                        value={inputs.sertifikasi}
                        onChange={changeHandle}
                        placeholder="Sertifikasi"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">JFA</label>
                    <div class="col-sm-8">
                      <input
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="jfa"
                        value={inputs.jfa}
                        onChange={changeHandle}
                        placeholder="JFA"/>
                    </div>
                  </div>
                {/* </div>
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel2">Input Data Individu</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> */}
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Dik Diakui</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="colFormLabel"
                        name="dik_diakui"
                        value={inputs.dik_diakui}
                        onChange={changeHandle}
                        placeholder="Dik Diakui"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Lit Diakui</label>
                    <div class="col-sm-8">
                      <input
                        type="Text"
                        class="form-control"
                        id="colFormLabel"
                        name="lit_diakui"
                        value={inputs.lit_diakui}
                        onChange={changeHandle}
                        placeholder="Lit Diakui"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Abdimas Diakui</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="colFormLabel"
                        name="abdimas_diakui"
                        value={inputs.abdimas_diakui}
                        onChange={changeHandle}
                        placeholder="Abdimas Diakui"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Penunjang</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="colFormLabel"
                        name="penunjang"
                        value={inputs.penunjang}
                        onChange={changeHandle}
                        placeholder="Penunjang"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Total SKS</label>
                    <div class="col-sm-8">
                      <input
                        type="text" 
                        class="form-control"
                        id="colFormLabel"
                        name="total_sks"
                        value={inputs.total_sks}
                        onChange={changeHandle}
                        placeholder="Total SKS"/>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="colFormLabel" class="col-sm-4 col-form-label">Pemenuhan Tridharma</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="colFormLabel"
                        name="pemenuhan_tridarma"
                        value={inputs.pemenuhan_tridarma}
                        onChange={changeHandle}
                        placeholder="Pemenuhan Tridharma"/>
                    </div>
                  </div>
                </div>
        
        
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal" type="submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
            <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Input Data Individu</a>
        </form>
}

      </div>
              
      {/* Tabel */}
      {dataList.length!=0 &&
      <div className="row">
        {/* {dataList} */}
          <div className="col-12">
              <div className="card">
                  <div className="card__body height-600">
                      <Table
                          limit='9999'
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