const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: 'password',
    database: 'DB',
    port: 3306
});

// app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from data";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.get('/api/get-cluster', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster";
    db.query(sqlSelect, (err, result) => {
        
        // console.log(result);
        res.send(result);
    });
});
app.get('/api/get-cluster-0', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster where cluster=0";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});
app.get('/api/get-cluster-1', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster where cluster=1";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});
app.get('/api/get-cluster-2', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster where cluster=2";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.get('/api/get-user', (req, res) => {
    // console.log(req.query.kode_nama)
    const sqlSelect = `select * from data where kode_nama="${req.query.kode_nama}"`;
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const input_data = req.body.data;
    // console.log(req.body.data);

    data_values = "";
    // var i =0;
    // for (var item of input_data){
        input_data.map((item) => {
            template_data = "(" + item["NO"] + ",'" + item["KODE NAMA"] + "','" + item["KODE"] + "', " + item["NO URUT"] + ", '" + item["PROGRAM STUDI"] + "','" + item["STATUS KEPEGAWAIAN"] + "','" + item["JFA"] + "'," + item["Dik Diakui"] + "," + item["Lit Diakui"] + "," + item["Abdimas Diakui"] + "," + item["Penunjang"] + "," + item["Prof Diakui"] + "," + item["Total SKS"] + ",'" + item["PEMENUHAN TRIDHARMA"] + "'), ";
            data_values += template_data;
            // i++;
            // if (i==3){
            //     break;
            // }
        });
    // };
    console.log(data_values);
    
    const sqlInsert = "insert into data values " + data_values.slice(0,-2) + ";";
    db.query(sqlInsert, (err, result) => {
        if(err) throw err;
            console.log(result);
    });
    // const sqlInsert = "insert into data (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma) values (1, 'a', 'a', 1, 'a', 'a', 'a', 1,1,1,1,1,1,'c');";
});
// const cors = require('cors');
// app.use(cors({
//     origin: '*'
// }));

app.listen(3001, () => {
    console.log("running on port 3001");
});
