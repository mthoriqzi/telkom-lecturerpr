const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'DB'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "select * from data";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const input_data = req.body.data;
    // console.log(req.body.data);
    data_values = "";
    input_data.map((item) => {
        template_data = "(" + item["NO"] + ",'" + item["KODE NAMA"] + "','" + item["KODE"] + "', " + item["NO URUT"] + ", '" + item["PROGRAM STUDI"] + "','" + item["STATUS KEPEGAWAIAN"] + "','" + item["JFA"] + "'," + item["Dik Diakui"] + "," + item["Lit Diakui"] + "," + item["Abdimas Diakui"] + "," + item["Penunjang"] + "," + item["Prof Diakui"] + "," + item["Total SKS"] + ",'" + item["PEMENUHAN TRIDHARMA"] + "'), ";
        data_values += template_data
    });
    // console.log(data_values);
    
    const sqlInsert = "insert into data values " + data_values.slice(0,-2) + ";";
    db.query(sqlInsert, (err, result) => {
        if(err) throw err;
            console.log(result);
    });
    // const sqlInsert = "insert into data (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma) values (1, 'a', 'a', 1, 'a', 'a', 'a', 1,1,1,1,1,1,'c');";
});

app.listen(3001, () => {
    console.log("running on port 3001");
});