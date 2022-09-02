const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: 'password',
    database: 'DB',
    port: 3306
});

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(cors());
app.post('/login', (req, res) => {
    console.log(req)
    res.set('Access-Control-Allow-Origin', '*');
    if(req.body.username=="dosen" && req.body.password=="dosen"){
        res.send({
            token: 'test123'
          });
    }
    if(req.body.username=="direktorat" && req.body.password=="kasar"){
        res.send({
            token: 'test12'
          });  
    }
    else{
        res.send({"salah":"password"})
    }


  });  
// app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/get/:periode', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from "+req.params.periode;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get('/api/get-cluster/:periode', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster_"+req.params.periode;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
app.get('/api/get-cluster/:periode/:cluster', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from hasil_cluster_"+req.params.periode+" where cluster="+req.params.cluster;
    // console.log(sqlSelect)
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.get('/api/get-user/:periode/:kode_nama', (req, res) => {
    // console.log(req.query.kode_nama)
    res.set('Access-Control-Allow-Origin', '*');
    const sqlSelect = "select * from "+req.params.periode +" where kode_nama='"+req.params.kode_nama+"'";
    db.query(sqlSelect, (err, result) => {
        console.log(sqlSelect);
        res.send(result);
    });
});

app.post('/api/insert/individu', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const i = req.body.data;
    // isi dummy data
    i.no=0
    i.no_urut=0
    i.prof_diakui=0

    data_values = "(" + i.no + ",'" + i.kode_nama + "','" + i.kode + "'," + i.no_urut + ",'" + i.pendidikan_terakhir + "','" + i.kelompok_keahlian + "','" + i.inpassing + "','" + i.sertifikasi + "','" + i.program_studi + "','" + i.status_kepegawaian + "','" + i.jfa + "'," + i.dik_diakui + "," + i.lit_diakui + "," + i.abdimas_diakui + "," + i.penunjang + "," + i.prof_diakui + "," + i.total_sks + ",'" + i.pemenuhan_tridarma + "')"
    const createTable = "create table if not exists " + req.body.periode + " (no int, kode_nama varchar(255), kode varchar(255), no_urut int, pendidikan_terakhir varchar(255), kelompok_keahlian varchar(255), inpassing varchar(255), sertifikasi varchar(255), program_studi varchar(255), status_kepegawaian varchar(255), jfa varchar(255), dik_diakui double, lit_diakui double, abdimas_diakui double, penunjang double, prof_diakui double, total_sks double, pemenuhan_tridarma varchar(255));"
    db.query(createTable, (err, result) => {
        if(err) throw err;
    });
    const sqlInsert = "insert into " + req.body.periode + " values " + data_values + ";";
    // console.log(sqlInsert)
    db.query(sqlInsert, (err, result) => {
        if(err) throw err;
    });
}); 

app.post('/api/insert', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const input_data = req.body.data;

    data_values = "";
    // var i =0;
    // for (var item of input_data){
    input_data.map((item) => {
        template_data = "(" + item["NO"] + ",'" + item["KODE NAMA"] + "','" + item["KODE"] + "', " + item["NO URUT"] + ", '" + item["PENDIDIKAN TERAKHIR"] + "','" + item["KELOMPOK KEAHLIAN"] + "','" + item["INPASSING"] + "','" + item["SERTIFIKASI"] + "','" + item["PROGRAM STUDI"] + "','" + item["STATUS KEPEGAWAIAN"] + "','" + item["JFA"] + "'," + item["Dik Diakui"] + "," + item["Lit Diakui"] + "," + item["Abdimas Diakui"] + "," + item["Penunjang"] + "," + item["Prof Diakui"] + "," + item["Total SKS"] + ",'" + item["PEMENUHAN TRIDHARMA"] + "'), ";
        data_values += template_data;
        // i++;
        // if (i==3){
        //     break;
        // }
    });

    const createTable = "create table if not exists " + req.body.periode + " (no int, kode_nama varchar(255), kode varchar(255), no_urut int, pendidikan_terakhir varchar(255), kelompok_keahlian varchar(255), inpassing varchar(255), sertifikasi varchar(255), program_studi varchar(255), status_kepegawaian varchar(255), jfa varchar(255), dik_diakui double, lit_diakui double, abdimas_diakui double, penunjang double, prof_diakui double, total_sks double, pemenuhan_tridarma varchar(255));"
    // console.log(createTable)
    db.query(createTable, (err, result) => {
        if(err) throw err;
    });
    const sqlInsert = "insert into " + req.body.periode + " values " + data_values.slice(0,-2) + ";";
    // console.log(sqlInsert)
    db.query(sqlInsert, (err, result) => {
        if(err) throw err;
    });
    // const sqlInsert = "insert into data (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma) values (1, 'a', 'a', 1, 'a', 'a', 'a', 1,1,1,1,1,1,'c');";
});
// const cors = require('cors');
// app.use(cors({
//     origin: '*'
// })); 
app.post('/api/delete', (req, res) => {
    // console.log(req.query.kode_nama)
    const sqlDelete = `delete from ${req.body.periode} where kode_nama="${req.body.data}"`;
    console.log(sqlDelete)
    db.query(sqlDelete, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
