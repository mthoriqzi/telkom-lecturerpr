import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Table from '../components/table/Table'
import customerList from '../assets/JsonData/customers-list.json'
 
function Data() {
 
  // const [columns, setColumns] = useState([]);
  // const [data, setData] = useState([]);
 
  // process CSV data
  // const processData = dataString => {
  //   const dataStringLines = dataString.split(/\r\n|\n/);
  //   const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
  //   const list = [];
  //   for (let i = 1; i < dataStringLines.length; i++) {
  //     const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  //     if (headers && row.length == headers.length) {
  //       const obj = {};
  //       for (let j = 0; j < headers.length; j++) {
  //         let d = row[j];
  //         if (d.length > 0) {
  //           if (d[0] == '"')
  //             d = d.substring(1, d.length - 1);
  //           if (d[d.length - 1] == '"')
  //             d = d.substring(d.length - 2, 1);
  //         }
  //         if (headers[j]) {
  //           obj[headers[j]] = d;
  //         }
  //       }
 
  //       // remove the blank rows
  //       if (Object.values(obj).filter(x => x).length > 0) {
  //         list.push(obj);
  //       }
  //     }
  //   }
 
  //   // prepare columns list from headers
  //   const columns = headers.map(c => ({
  //     name: c,
  //     selector: c,
  //   }));
 
  //   setData(list);
  //   setColumns(columns);
  // }
  const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location'
  ]

  
  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]])
      console.log(JSON.stringify(data), "\n\n");
      // processData(data);
    };
    reader.readAsBinaryString(file);
  }

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
      <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.total_orders}</td>
          <td>{item.total_spend}</td>
          <td>{item.location}</td>
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
      {/* <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      /> */}
      <div className="row">
          <div className="col-12">
              <div className="card">
                  <div className="card__body">
                      <Table
                          limit='10'
                          headData={customerTableHead}
                          renderHead={(item, index) => renderHead(item, index)}
                          bodyData={customerList}
                          renderBody={(item, index) => renderBody(item, index)}
                      />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
 
export default Data;