// import React from 'react'
// import axios from 'axios';
// import { ScatterChart, Scatter, XAxis, 
//     YAxis, CartesianGrid } from 'recharts';

// // const axiost = require('axios');

// // const res = await axiost.get('http://127.0.0.1:5000');

// // res.constructor.name; // 'Object', means `res` is a POJO

// // // `res.data` contains the parsed response body
// // res.data; // { args: { answer: 42 }, ... }
// // res.data instanceof Object; // true
// function HasilCluster() {
 
//     const [dataList, setDataList] = useState([])
    
//     useEffect(() => {
//       axios.get('http://127.0.0.1:5000').then((response) => {
//         setDataList(response.data);
//       });
//     }, []);
    
//     const customerTableHead = [
//       'NO',
//       'KODE NAMA',
//       'KODE',
//       'NO URUT',
//       'PROGRAM STUDI',
//       'STATUS KEPEGAWAIAN',
//       'JFA',
//       'DIK DIAKUI',
//       'LIT DIAKUI',
//       'ABDIMAS DIAKUI',
//       'PENUNJANG',
//       'PROF DIAKUI',
//       'TOTAL SKS',
//       'PEMENUHAN TRIDHARMA'
//     ]
  

  
//     // const renderHead = (item, index) => <th key={index}>{item}</th>
  
//     // const renderBody = (item, index) => (
//     //     <tr key={index}>
//     //         <td>{item.no}</td>
//     //         <td>{item.kode_nama}</td>
//     //         <td>{item.kode}</td>
//     //         <td>{item.no_urut}</td>
//     //         <td>{item.program_studi}</td>
//     //         <td>{item.status_kepegawaian}</td>
//     //         <td>{item.jfa}</td>
//     //         <td>{item.dik_diakui}</td>
//     //         <td>{item.lit_diakui}</td>
//     //         <td>{item.abdimas_diakui}</td>
//     //         <td>{item.penunjang}</td>
//     //         <td>{item.prof_diakui}</td>
//     //         <td>{item.total_sks}</td>
//     //         <td>{item.pemenuhan_tridarma}</td>
//     //     </tr>
//     // )
  
//     return (
//         <ScatterChart width={400} height={400}>
//         <CartesianGrid />
//         <XAxis type="string" dataKey="kode_nama" />
//         <YAxis type="number" dataKey="cluster" />
//         <Scatter post={response.data} fill="green" />
//         </ScatterChart>
//     );
//   }
   
//   export default HasilCluster;