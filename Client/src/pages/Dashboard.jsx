// import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'
import React, { useState, useEffect} from 'react'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Axios from 'axios';

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'
import './Pages.css'
import ReactApexChart from 'react-apexcharts';
import periode from '../pages/Data'


function Dashboard () {

const [dataList, setDataList] = useState([])
const [periode, setPeriode] = useState("Ganjil_2020")
useEffect(() => {
    Axios.get('http://34.101.42.148:3001/api/get/'+periode).then((response) => {
      setDataList(response.data);
    });
  }, [periode]);

// const piechart = {
//     series: [dataList[], 55],
//     options: {
//       chart: {
//         width: 380,
//         type: 'pie',
//       },
//       labels: ['Laki-laki', 'Perempuan'],
//       responsive: [{
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200
//           },
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }]
//     }
// }
var tetappm = 0
var tetapems = 0
var tetapc = 0
var tetapei = 0
var ctetappm = 0
var ctetapems = 0
var ctetapc = 0
var ctetapei = 0
var pftpm = 0
var pftems = 0
var pftc = 0
var pftei = 0
var pptpm = 0
var pptems = 0
var pptc = 0
var pptei = 0
console.log(periode)

if (dataList.length!=0){
    for (var i in dataList){
        // console.log(dataList["status_kepegawaian"])
        if (dataList[i]["status_kepegawaian"]=="DOSEN PEGAWAI TETAP"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          tetappm = tetappm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          tetapems = tetapems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          tetapc = tetapc + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          tetapei = tetapei + 1}}
        if (dataList[i]["status_kepegawaian"]=="DOSEN CALON PEGAWAI TETAP"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          ctetappm = ctetappm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          ctetapems = ctetapems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          ctetapc = ctetapc + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          ctetapei = ctetapei + 1}}
        if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL FULL TIME"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          pftpm = pftpm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          pftems = pftems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          pftc = pftc + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          pftei = pftei + 1}}
        if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL PART TIME"){
        // console.log("mashok2")
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          pptpm = pptpm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          pptems = pptems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          pptc = pptc + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          pptei = pptei + 1}
          }

    }

}
console.log(tetapc)
console.log(tetapei)
console.log(tetapems)
console.log(tetappm)

const statusPegawai = {
        series: [{
            name: 'TETAP',
            data: [tetappm, tetapems, tetapc, tetapei]
          }, {
            name: 'CALON TETAP',
            data: [ctetappm, ctetapems, ctetapc, ctetapei]
          },{
            name: 'PROFESSIONAL FULL TIME',
            data: [pftpm, pftems, pftc, pftei]
          },{
            name: 'PROFESSIONAL FULL PART TIME',
            data: [pptpm, pptems, pptc, pptei]
          }],
          options:{
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'Status Pegawai'
          },
          xaxis: {
            categories: ["Production & Manufacturing System", "Engineering Management System", "Cyberkinetics", "EINS"],
    
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
          }};

var PMTk1PM = 0
var PMTk1EMS = 0
var PMTk1C = 0
var PMTk1EI = 0
var PtPM = 0
var PtEMS = 0
var PtC = 0
var PtEI = 0
var PtTk1PM = 0
var PtTk1EMS = 0
var PtTk1C = 0
var PtTk1EI = 0
var PePM = 0
var PeEMS = 0
var PeC = 0
var PeEI = 0
var PeTk1PM = 0
var PeTk1EMS = 0
var PeTk1C = 0
var PeTk1EI = 0
var PeUMPM = 0
var PeUMEMS = 0
var PeUMC = 0
var PeUMEI = 0
var PeUMaPM = 0
var PeUMaEMS = 0
var PeUMaC = 0
var PeUMaEI = 0
var PeUPM = 0
var PeUEMS = 0
var PeUC = 0
var PeUEI = 0


if (dataList.length!=0){
    for (var i in dataList){
        console.log(dataList["status_kepegawaian"])
        if (dataList[i]["inpassing"]=="PENATA MUDA TK 1"){

          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PMTk1PM = PMTk1PM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PMTk1EMS = PMTk1EMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PMTk1C = PMTk1C + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PMTk1EI = PMTk1EI + 1}
          }
        if (dataList[i]["inpassing"]=="PENATA"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PtPM = PtPM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PtEMS = PtEMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PtC = PtC + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PtEI = PtEI + 1}}
        
        if (dataList[i]["inpassing"]=="PENATA TK 1"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PtTk1PM = PtTk1PM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PtTk1EMS = PtTk1EMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PtTk1C = PtTk1C + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PtTk1EI = PtTk1EI + 1}
          }
        if (dataList[i]["inpassing"]=="PEMBINA"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PePM = PePM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PeEMS = PeEMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PeC = PeC + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PeEI = PeEI + 1}
          }
        if (dataList[i]["inpassing"]=="PEMBINA TK 1"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PeTk1PM = PeTk1PM + 1}
          if (dataList[i]["kelom{pok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PeTk1EMS = PeTk1EMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PeTk1C = PeTk1C + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PeTk1EI = PeTk1EI + 1}
          }
        if (dataList[i]["inpassing"]=="PEMBINA UTAMA MUDA"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PeUMPM = PeUMPM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PeUMEMS = PeUMEMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PeUMC = PeUMC + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PeUMEI = PeUMEI + 1}
          }
        if (dataList[i]["inpassing"]=="PEMBINA UTAMA MADYA"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PeUMaPM = PeUMaPM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PeUMaEMS = PeUMaEMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PeUMaC = PeUMaC + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PeUMaEI = PeUMaEI + 1}}
        if (dataList[i]["inpassing"]=="PEMBINA UTAMA"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          PeUPM = PeUPM + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          PeUEMS = PeUEMS + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          PeUC = PeUC + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          PeUEI = PeUEI + 1}}

    }

}
console.log(PMTk1C)
const inpassingdosen = {
        series: [{
            name: 'PENATA MUDA TK 1',
            data: [PMTk1PM, PMTk1EMS, PMTk1C, PMTk1EI]
          }, {
            name: 'PENATA',
            data: [PtPM, PtEMS, PtC, PtEI]
          },{
            name: 'PENATA TK 1',
            data: [PeTk1PM, PeTk1EMS, PeTk1C, PeTk1EMS]
          },{
            name: 'PEMBINA',
            data: [PePM, PeEMS, PeC, PeEI]
          },{
            name: 'PEMBINA TK 1',
            data: [PeTk1PM, PeTk1EMS, PeTk1C, PeTk1EI]
          }, {
            name: 'PEMBINA UTAMA MUDA"',
            data: [PeUMPM, PeUMEMS, PeUMC, PeUMEI]
          },{
            name: 'PEMBINA UTAMA MADYA',
            data: [PeUMaPM, PeUMaEMS, PeUMaC, PeUMaEI]
          },{
            name: 'PEMBINA UTAMA"',
            data: [PeUPM, PeUEMS, PeUC, PeUEI]
          }],
          options:{
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'Inpassing Dosen'
          },
          xaxis: {
            categories: ["Production & Manufacturing System", "Engineering Management System", "Cyberkinetics", "EINS"],
    
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
          }};

var GBPM = 0
var GBEMS = 0
var GBC = 0
var GBE = 0
var LKPM = 0
var LKEMS = 0
var LKC = 0
var LKE = 0
var LPM = 0
var LEMS = 0
var LC = 0
var LE = 0
var AAPM = 0
var AAEMS = 0
var AAC = 0
var AAE = 0
var NJPM = 0
var NJEMS = 0
var NJC = 0
var NJE = 0


if (dataList.length!=0){
    for (var i in dataList){
        console.log(dataList["status_kepegawaian"])
        if (dataList[i]["jfa"]=="GB"){
            if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
            GBPM = GBPM + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
            GBEMS = GBEMS + 1}
            if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
            GBC = GBC + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
            GBE = GBE + 1}}
        if (dataList[i]["jfa"]=="LK"){
            if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
            LKPM = LKPM + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
            LKEMS = LKEMS + 1}
            if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
            LKC = LKC + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
            LKE = LKE + 1}}
        if (dataList[i]["jfa"]=="L"){
            if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
            LPM = LPM + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
            LEMS = LEMS + 1}
            if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
            LC = LC + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
            LE = LE + 1}}
        if (dataList[i]["jfa"]=="AA"){
            if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
            AAPM = AAPM + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
            AAEMS = AAEMS + 1}
            if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
            AAC = AAC + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
            AAE = AAE + 1}}
        if (dataList[i]["jfa"]=="NJ"){
            if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
            NJPM = NJPM + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
            NJEMS = NJEMS + 1}
            if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
            NJC = NJC + 1}
            if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
            NJE = NJE + 1}}
        

    }

}

var s1s1ti = 0
var s1s2ti = 0
var s1s1si = 0
var s1s2si = 0
var s1s1tl = 0
var s2s1ti = 0
var s2s2ti = 0
var s2s1si = 0
var s2s2si = 0
var s2s1tl = 0
var s3s1ti = 0
var s3s2ti = 0
var s3s1si = 0
var s3s2si = 0
var s3s1tl = 0

if (dataList.length!=0){
    for (var i in dataList){
        if (dataList[i]["pendidikan_terakhir"]=="S1"){
            if (dataList[i]["kode"]=="S1TI"){
            s1s1ti = s1s1ti + 1}
            if (dataList[i]["kode"]=="S2TI"){
            s1s2ti = s1s2ti + 1}
            if (dataList[i]["kode"]=="S1SI"){
            s1s1si = s1s1si + 1}
            if (dataList[i]["kode"]=="S2SI"){
            s1s2si = s1s2si + 1}
            if (dataList[i]["kode"]=="S1TL"){
            s1s1tl = s1s1tl + 1}}
        if (dataList[i]["pendidikan_terakhir"]=="S2"){
            if (dataList[i]["kode"]=="S1TI"){
            s2s1ti = s2s1ti + 1}
            if (dataList[i]["kode"]=="S2TI"){
            s2s2ti = s2s2ti + 1}
            if (dataList[i]["kode"]=="S1SI"){
            s2s1si = s2s1si + 1}
            if (dataList[i]["kode"]=="S2SI"){
            s2s2si = s2s2si + 1}
            if (dataList[i]["kode"]=="S1TL"){
            s2s1tl = s2s1tl + 1}}
        if (dataList[i]["pendidikan_terakhir"]=="S3"){
            if (dataList[i]["kode"]=="S1TI"){
            s3s1ti = s3s1ti + 1}
            if (dataList[i]["kode"]=="S2TI"){
            s3s2ti = s3s2ti + 1}
            if (dataList[i]["kode"]=="S1SI"){
            s3s1si = s3s1si + 1}
            if (dataList[i]["kode"]=="S2SI"){
            s3s2si = s3s2si + 1}
            if (dataList[i]["kode"]=="S1TL"){
            s3s1tl = s3s1tl + 1}}
    }}
        
const dbps = {
    series: [{
        name: 'S1',
        data: [s1s1ti, s1s2ti, s1s1si, s1s2si, s1s1tl]
      }, {
        name: 'S2',
        data: [s2s1ti, s2s2ti, s2s1si, s2s2si, s2s1tl]
      }, {
        name: 'S3',
        data: [s3s1ti, s3s2ti, s3s1si, s3s2si,s3s1tl]
      }],
      options:{
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'Dosen Berdasarkan Program Studi'
      },
      xaxis: {
        categories: ["S1 TI", "S2 TI", "S1 SI", "S2 SI", "S1 TL"],

      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val 
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
      }};

    const kk = {
        series: [{
            name: 'GB',
            data: [GBPM, GBEMS, GBC, GBE]
          }, {
            name: 'LK',
            data: [LKPM, LKEMS, LKC, LKE]
          }, {
            name: 'L',
            data: [LPM, LEMS, LC, LE]
          }, {
            name: 'AA',
            data: [AAPM, AAEMS, AAC, AAE]
          }, {
            name: 'NJAD',
            data: [NJPM, NJEMS, NJC, NJE]
          }],
          options:{
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'Dosen Berdasarkan Kelompok Keahlian'
          },
          xaxis: {
            categories: ["Production & Manufacturing System", "Engineering Management System", "Cyberkinetics", "EINS"],
    
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
          }};
    


var spm = 0
var sems = 0
var scy = 0
var sei = 0
var bpm = 0
var bems = 0
var bcy = 0
var bei = 0

if (dataList.length!=0){
    for (var i in dataList){
        if (dataList[i]["sertifikasi"]=="SUDAH"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          spm = spm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          sems = sems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          scy = scy + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          sei = sei + 1}}
        if (dataList[i]["sertifikasi"]=="BELUM"){
          if (dataList[i]["kelompok_keahlian"]=="PRODUCTION AND MANUFACTURING SYSTEM"){
          bpm = bpm + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENGINEERING MANAGEMENT SYSTEM"){
          bems = bems + 1}
          if (dataList[i]["kelompok_keahlian"]=="CYBERNETICS"){
          bcy = bcy + 1}
          if (dataList[i]["kelompok_keahlian"]=="ENTERPRISE AND INDUSTRIAL SYSTEM"){
          bei = bei + 1}}
   
    }}
    const sertif = {
        series: [{
            name: 'SUDAH',
            data: [spm, sems, scy, sei]
          }, {
            name: 'BELUM',
            data: [bpm, bems, bcy, bei]
          }],
          options:{
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'Sertifikasi Dosen'
          },
          xaxis: {
            categories: ["Production & Manufacturing System", "Engineering Management System", "Cyberkinetics", "EINS"],
    
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
          }};

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}
    const namauser=({token}) => {
      var pengguna ="admin"
    if (token.token == "test12"){
        console.log("masuk token12")
        pengguna="Direktorat"}
    if (token.token == "test123"){
    console.log("masuk token123")
        pengguna="Dosen"}
    }

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)
// const baseURL = "http://127.0.0.1:5000";
// const [post, setPost] = React.useState(null);

// React.useEffect(() => {
//   axios.get(baseURL).then((response) => {
//     setPost(response.data);
//   });
// }, []);

// if (!post) return null;

// return (
//   <div>
//     <h1>{post.kode_nama}</h1>
//     <p>{post.cluster}</p>
//   </div>
// );


    const themeReducer = useSelector(state => state.ThemeReducer.mode)


    return (
        <div>
            <h2 className="page-header">Selamat Datang di Dashboard Evaluasi Kinerja</h2>
            <h6 className='margin-bottom'>Hi , Selamat datang kembali</h6>
            <div className="row">
                {/* <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div> */}

                {dataList.length!=0 &&
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...statusPegawai.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...statusPegawai.options,
                                theme: { mode: 'light'}
                            }}
                            series={statusPegawai.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                }
                
                {dataList.length!=0 &&
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...kk.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...kk.options,
                                theme: { mode: 'light'}
                            }}
                            series={kk.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                }
              {dataList.length!=0 &&
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...dbps.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...dbps.options,
                                theme: { mode: 'light'}
                            }}
                            series={dbps.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                }
                {dataList.length!=0 &&
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...sertif.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...sertif.options,
                                theme: { mode: 'light'}
                            }}
                            series={sertif.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                }
                {dataList.length!=0 &&
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <ReactApexChart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...inpassingdosen.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...inpassingdosen.options,
                                theme: { mode: 'light'}
                            }}
                            series={inpassingdosen.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
                }
                {/* <div className="col-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
            
}
export default Dashboard
