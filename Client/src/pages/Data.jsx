import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import NewTable from '../components/table/NewTable'
import Axios from 'axios';
import { Link } from 'react-router-dom'
// import Login from "../pages/Login"

function Data({token}) {
  const [data20191, setData20191] = useState([])
  const [data20192, setData20192] = useState([])
  const [data20201, setData20201] = useState([])
  const [data20202, setData20202] = useState([])
  const [data20211, setData20211] = useState([])
  const [data20212, setData20212] = useState([])
  const [data20221, setData20221] = useState([])
  const [data20222, setData20222] = useState([])
  const [dataList, setDataList] = useState([])
  const [periode, setPeriode] = useState("Genap_2020")
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
    Axios.get('http://34.101.42.148:3001/api/get/'+periode).then((response) => {
      var data = response.data
      data.sort((a, b) => a.no > b.no)
      setDataList(data);
    });

        // Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2019/").then((response) => {
        //     setData20191(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Genap_2019/").then((response) => {
        //     setData20192(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2020/").then((response) => {
        //     setData20201(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Genap_2020/").then((response) => {
        //     setData20202(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2021/").then((response) => {
        //     setData20211(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Genap_2021/").then((response) => {
        //     setData20212(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Ganjil_2022/").then((response) => {
        //     setData20221(response.data);

        // });
        // Axios.get("http://34.101.42.148:3001/api/get/Genap_2022/").then((response) => {
        //     setData20222(response.data);
    // });
  }, [periode]);

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
    Axios.post("http://34.101.42.148:3001/api/insert", {
      "data": data,
      "periode":periode});
    const flask = "http://34.101.42.148:4999/api/"+periode
    delay(1000).then(() => Axios.get(flask, 'GET') );
  }

  const sendToDBindividu = (data, periode) => {
    Axios.post("http://34.101.42.148:3001/api/insert/individu", {
      "data": data,
      "periode":periode});
    const flask = "http://34.101.42.148:4999/api/"+periode
    delay(1000).then(() => Axios.get(flask, 'GET') );
  }

  const editDB = (data) => {
    for (var item of Object.keys(inputs)){
      if (inputs[item]==""){
        inputs[item]=data[item]
      }
    }
    Axios.post("http://34.101.42.148:3001/api/edit", {
      "data": inputs,
      "periode":periode});
    const flask = "http://34.101.42.148:4999/api/"+periode
    delay(1000).then(() => Axios.get(flask, 'GET') );
  }

  const handleRemoveItem = name => {
    Axios.post("http://34.101.42.148:3001/api/delete", {
      "data": name,
      "periode":periode});
  }

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
    <tr key={index}>
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
      <td>{editItem(item.kode_nama)}</td>
      <td><button value={item.kode_nama} onClick={() => handleRemoveItem(item.kode_nama)}>Delete</button></td>
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
    sendToDBindividu(inputs,periode);
  }

  const editItem = (nama) => {
    var dosen = dataList.find(item => item.kode_nama === nama)
    return(
      <>
        <button class="btn btn-outline-secondary" type="button" data-bs-target="#edit" data-bs-toggle="modal">Edit</button>
        <div class="modal fade" id="edit" aria-hidden="true" aria-labelledby="staticBackdropLabel" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit: {nama}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Pendidikan Terakhir:</span>
                  <input 
                    type="text"
                    class="form-control"
                    onChange={changeHandle}
                    name="pendidikan_terakhir"
                    placeholder={dosen.pendidikan_terakhir}
                    value={inputs.pendidikan_terakhir}
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Kelompok Keahlian:</span>
                  <input
                    type="text"
                    class="form-control"
                    onChange={changeHandle}
                    name="kelompok_keahlian"
                    placeholder={dosen.kelompok_keahlian}
                    value={inputs.kelompok_keahlian}
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Inpassing:</span>
                  <input
                    type="text"
                    class="form-control"
                    onChange={changeHandle}
                    name="inpassing"
                    placeholder={dosen.inpassing}
                    value={inputs.inpassing} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Sertifikasi:</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="sertifikasi" 
                    placeholder={dosen.sertifikasi} 
                    value={inputs.sertifikasi}
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Program Studi:</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="program_studi" 
                    placeholder={dosen.program_studi} 
                    value={inputs.program_studi} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Status Kepegawaian:</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="status_kepegawaian"
                    placeholder={dosen.status_kepegawaian} 
                    value={inputs.status_kepegawaian} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">JFA:</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="jfa" 
                    placeholder={dosen.jfa} 
                    value={inputs.jfa} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Dik Diakui:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="dik_diakui" 
                    placeholder={dosen.dik_diakui} 
                    value={inputs.dik_diakui} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Lit Diakui:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="lit_diakui" 
                    placeholder={dosen.lit_diakui} 
                    value={inputs.lit_diakui} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Abdimas Diakui:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="abdimas_diakui" 
                    placeholder={dosen.abdimas_diakui} 
                    value={inputs.abdimas_diakui} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Penunjang:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="penunjang" 
                    placeholder={dosen.penunjang} 
                    value={inputs.penunjang} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Prof Diakui:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="prof_diakui" 
                    placeholder={dosen.prof_diakui} 
                    value={inputs.prof_diakui} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Total SKS:</span>
                  <input 
                    type="number" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="total_sks" 
                    placeholder={dosen.total_sks} 
                    value={inputs.total_sks} 
                    aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">Pemenuhan Tridharma:</span>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={changeHandle} 
                    name="pemenuhan_tridarma" 
                    placeholder={dosen.pemenuhan_tridarma} 
                    value={inputs.pemenuhan_tridarma} 
                    aria-describedby="basic-addon1"/>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick={() => editDB(dosen)} data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <h3>MASTER DATA </h3> 
        </div>
        {/* Pilih Periode */}
        <div className='col-3'>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                {periode}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            {/* {data20212.length!=0  &&
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
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2019")}>2019 - Ganjil</button></li>
} */}
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2021")}>2021 - Genap</button></li>
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2020")}>2020 - Genap</button></li>
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2020")}>2020 - Ganjil</button></li>

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
                        name="pendidikan_terakhir"
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
                        name="kelompok_keahlian"
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
                        name="inpassing"
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
                        name="sertifikasi"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number"
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
                        type="number" 
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
                      <NewTable
                          limit='9999'
                          headData={customerTableHead}
                          renderHead={(item, index) => renderHead(item, index)}
                         
                          // bodyData = {[{no: 67, kode_nama: "S1SI-060", kode: "S1SI", no_urut: 60, pendidikan_terakhir: "S2"}, 
                          // {no: 67, kode_nama: "S1SI-060", kode: "S1SI", no_urut: 60, pendidikan_terakhir: "S2"},
                          // {no: 67, kode_nama: "S1SI-060", kode: "S1SI", no_urut: 60, pendidikan_terakhir: "S2"}]}
                          bodyData={dataList}
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