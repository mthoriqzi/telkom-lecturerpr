import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import NewTable from '../components/table/NewTable'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import EditModal from '../components/ModalEdit/EditModal.jsx'
// import Login from "../pages/Login"


function Data({token}) {
  
  const [dataList, setDataList] = useState([])
  const [periode, setPeriode] = useState("Genap_2020")
  const [data20201, setData20201] = useState([])
  const [data20202, setData20202] = useState([])
  const [data20211, setData20211] = useState([])
  const [data20212, setData20212] = useState([])
  const [data20221, setData20221] = useState([])
  const [data20222, setData20222] = useState([])
  const [notifikasi, setNotifikasi] = useState(EditModal.notifikasi)

  const [openModal, setOpenModal] = useState(false)
  const [periode1, setPeriode1] = useState("Ganjil_2020")
  
  // var selectedData = {}
  const [selected, setSelected] = useState({})

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
  }, [periode]);
  console.log("???? ~ file: Data.jsx ~ line 85 ~ Data ~ periode", periode)

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

  const dataDropdown = {
    pendidikan_terakhir: ["S1","S2","S3"],
    kelompok_keahlian: ["ENGINEERING MANAGEMENT SYSTEM","ENTERPRISE AND INDUSTRIAL SYSTEM", "CYBERNETICS", "PRODUCTION AND MANUFACTURING SYSTEM"],
    inpassing: ["Pembina","Pembina TK 1","Pembina Utama","Pembina Utama Madya","Pembina Utama Muda","Penata","Penata Muda TK 1","Penata TK 1"],
    sertifikasi: ["SUDAH","BELUM"],
    program_studi: ["PRODI S2 TEKNIK INDUSTRI (FRI) (2019)","PRODI S1 TEKNIK INDUSTRI (FRI) (2019)","PRODI S1 SISTEM INFORMASI (FRI) (2019)","PRODI S1 TEKNIK LOGISTIK (FRI) (2019)"],
    status_kepegawaian: ["DOSEN PEGAWAI TETAP","DOSEN PROFESIONAL FULL TIME","DOSEN CALON PEGAWAI TETAP","DOSEN PROFESIONAL PART TIME"],
    jfa: ["AA","L","LK","NJFA"],
    pemenuhan_tridarma: ["MEMENUHI","TDK MEMENUHI"]
  }

  const periodeDropdown = {
    ddperiode: ["Ganjil","Genap"],
  

  }
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const sendToDB = (data) => {
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
      if (inputs[item]===""){
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
    deleteData(name)  
  }

  const deleteData = nama => {
    const newData = dataList.filter(person => person.kode_nama !== nama)
    setDataList(newData)
  }

  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      // console.log(data)
      sendToDB(data);
    };
    reader.readAsBinaryString(file);
  }

  const setSelectedData = (data) => {
    setOpenModal(true)
    // console.log('data di selected item', data)
    // setIsEditing(!isEditing)
    // selectedData = data
    setSelected(data)
    // console.log(openModal)
  }

  const renderHead = (item, index) => <th key={index}>{item}</th>
  function someFunc(item={item}) {
    setNotifikasi("edit5");
    setSelectedData(item);
}

function someFuncDelete(item={item}) {
  setNotifikasi("delete");
  handleRemoveItem(item.kode_nama);
}
  
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
      <td><button class="btn btn-outline-secondary" type="button" onClick={() => someFunc(item)}>Edit</button></td>
      <td><button class="btn btn-outline-secondary" type="button" value={item.kode_nama} onClick={() => someFuncDelete(item)}>Delete</button>     
</td>
    </tr>
  )
  console.log(notifikasi)
  
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

  const inputManual = (type,key, nama, placeholder) => {
    return(
      <div class="row mb-3">
        <label for="colFormLabel" class="col-sm-4 col-form-label">{nama}</label>
        <div class="col-sm-8">
          <input
            type={type} 
            class="form-control"
            id="colFormLabel"
            name={key}
            value={inputs[key]}
            onChange={changeHandle}
            placeholder={placeholder}/>
        </div>
      </div>
    )
  }
  const inputDropdown = (key, nama, jumlah) => {
    return (
    <div class="row mb-3">
      <label for="colFormLabel" class="col-sm-4 col-form-label">{nama}</label>
      <div class="col-sm-8">
        {dropdown(key, jumlah)}
      </div>
    </div>
    )
  }

  const generateDropdown = (item) => {
    var result = []
    Object.keys(dataDropdown).map(category => {
      var nama = category.split("_").join(" ").toUpperCase()
      result.push(
        <div class="row mb-3">
          <label for="colFormLabel" class="col-sm-4 col-form-label">{nama}</label>
          <div class="col-sm-8">
            <select class="form-select" onClick={(e) => setInputs({...inputs,[category]:e.target.value})}>
              {
                dataDropdown[category].map(el => (item[category].toLowerCase()).includes(el.toLowerCase()) ? <option value={el} selected>{el}</option> : <option value={el}>{el}</option>)
                // () => console.log(typeof item.category)
              }
            </select>
          </div>
        </div>
      )
    })
    return result
  }

  const dropdown = (key, jumlah) => {
    return (
      <>
        {/* <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{inputs[key]}</button> */}
        <select class="form-select" onClick={(e) => setInputs({...inputs,[key]:e.target.value})}>
          {/* <option class="" selected>{defaultIsi}</option> */}
          <option value ={dataDropdown[key][0]} selected>{dataDropdown[key][0]}</option>
          <option value ={dataDropdown[key][1]}>{dataDropdown[key][1]}</option>
          {jumlah>=3 &&
            <option value ={dataDropdown[key][2]}>{dataDropdown[key][2]}</option>
          }
          {jumlah>=4 &&
            <option value ={dataDropdown[key][3]}>{dataDropdown[key][3]}</option>
          }
          {jumlah===8 &&
            <>
              <option value ={dataDropdown[key][4]}>{dataDropdown[key][4]}</option>
              <option value ={dataDropdown[key][5]}>{dataDropdown[key][5]}</option>
              <option value ={dataDropdown[key][6]}>{dataDropdown[key][6]}</option>
              <option value ={dataDropdown[key][7]}>{dataDropdown[key][7]}</option>
            </>
          }
        </select>
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
            {/* {data20212.length!==0  && */}
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2021")}>2021 - Genap</button></li>
            {/* }
            {data20211.length!==0  && */}
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2021")}>2021 - Ganjil</button></li>
            {/* }{data20202.length!==0  && */}
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2020")}>2020 - Genap</button></li>
            {/* }{data20201.length!==0  && */}
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2020")}>2020 - Ganjil</button></li>
            {/* } */}
            {/* {data20192.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2019")}>2019 - Genap</button></li>
            }{data20191.length!=0  &&
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2019")}>2019 - Ganjil</button></li>
} */}
                {/* <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2021")}>2021 - Genap</button></li>
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Genap_2020")}>2020 - Genap</button></li>
                <li><button class="dropdown-item" type="button" onClick={() => setPeriode("Ganjil_2020")}>2020 - Ganjil</button></li> */}

                </ul>
          </div>
        </div>
        {/* Input File */}
        {/* {token.token==="test123" &&
        <div className='col-3'>  
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
        </div>
        } */}

        {token.token==="test123" &&
        <form className='col-3' onSubmit={submitHandle}>
          <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel">Input Data Periode</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div className='row'>
                                  <div className='col-6'>
                {inputManual("number","periode","Periode","")}</div>
                <div className='col-6'>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tahun Akademik: {periode1}</button>
                <div class="dropdown-menu">
                    <li><a class="dropdown-item" onClick={() => setPeriode1("Genap")}>Genap</a></li>
                    <li><a class="dropdown-item" onClick={() => setPeriode1("Ganjil")}>Ganjil</a></li>
  
                </div></div></div>

                <div className='col-3'>  
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                  />
        </div>


                </div>
        
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal" type="button">Submit</button>
                </div>
              </div>
              
            </div>
          </div>
            <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Input Data Periode</a>
        </form>
        
        }





        {/* Input Data Individu */}
        {token.token==="test123" &&
        <form className='col-3' onSubmit={submitHandle}>
          <div class="modal fade" id="exampleModalToggleq" aria-hidden="true" aria-labelledby="exampleModalToggleLabelq" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabelq">Input Data Individu</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {inputManual("text","kode_nama","Kode Nama","")}
                  {inputManual("text","kode","Kode","")}
                  {inputDropdown("pendidikan_terakhir","Pendidikan terakhir",3)}
                  {inputDropdown("kelompok_keahlian","Kelompok Keahlian",4)}
                  {inputDropdown("inpassing","Inpassing",8)}
                  {inputDropdown("sertifikasi","Sertifikasi",2)}
                  {inputDropdown("program_studi","Program Studi",4)}
                  {inputDropdown("status_kepegawaian","Status Kepegawaian",4)}
                  {inputDropdown("jfa","JFA",4)}
                  {inputManual("number","dik_diakui","Dik Diakui","")}
                  {inputManual("number","lit_diakui","Lit Diakui","")}
                  {inputManual("number","abdimas_diakui","Abdimas Diakui","")}
                  {inputManual("number","penunjang","Penunjang","")}
                  {inputManual("number","total_sks","Total SKS","")}
                  {inputDropdown("pemenuhan_tridarma","Pemenuhan Tridharma",2)}
                </div>
        
                <div class="modal-footer">
                  <button class="btn btn-primary" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal" type="submit">Submit</button>
                </div>
              </div>
              
            </div>
          </div>
            <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggleq" role="button">Input Data Individu</a>
        </form>
        
        }{/* notifikasi  */}
<div>
        <br></br>
        </div>
        {notifikasi=="edit" ?
        
        <div className="row">
                {/* {dataList} */}
                  <div className="col-12">
                      <div className="card">
                          <div className="card__body height-600">
                              <h6 >Data telah berhasil di edit, silahkan muat ulang halaman ini</h6>
                          </div>
                      </div>
                  </div>
              </div>: null}
        
        {notifikasi=="delete"  ?
        <div className="row">
                {/* {dataList} */}
                  <div className="col-12">
                      <div className="card">
                          <div className="card__body height-600" >
                              <h6 >Data telah berhasil di delete</h6>
                          </div>
                      </div>
                  </div>
              </div>: null}
      </div>
     
      {/* Tabel */}
      {dataList.length!==0 &&
      <div className="row">
        {/* {dataList} */}
          <div className="col-12">
              <div className="card">
                  <div className="card__body height-600">
                      <NewTable
                          limit='9999'
                          headData={customerTableHead}
                          renderHead={(item, index) => renderHead(item, index)}

                          bodyData={dataList}
                          renderBody={(item, index) => renderBody(item, index)}
                       />
                  </div>
              </div>
          </div>
      </div>
      }
      {
       openModal && <EditModal setNotifikasi={setNotifikasi} data={selected} inputDropdown={inputDropdown} inputManual={inputManual} editDB={editDB} generateDropdown={generateDropdown} setOpenModal={setOpenModal}/>
      }



    </div>

    
  );
}
 
export default Data;