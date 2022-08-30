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


function Dashboard () {

const [dataList, setDataList] = useState([])
useEffect(() => {
    Axios.get('http://localhost:3001/api/get-cluster/Ganjil_2019').then((response) => {
        setDataList(response.data);
    });

}, []);

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
var pegawai_tetap = 0
var pegawai_calonpegawaitetap = 0
var pegawai_profulltime = 0
var pegawai_proparttime = 0

if (dataList.length!=0){
    for (var i in dataList){
        console.log(dataList["status_kepegawaian"])
        if (dataList[i]["status_kepegawaian"]=="DOSEN PEGAWAI TETAP")
        // console.log("mashok")
        pegawai_tetap = pegawai_tetap + 1

        if (dataList[i]["status_kepegawaian"]=="DOSEN CALON PEGAWAI TETAP")
        // console.log("mashok2")
        pegawai_calonpegawaitetap = pegawai_calonpegawaitetap + 1

        if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL FULL TIME")
        // console.log("mashok1")
        pegawai_profulltime = pegawai_profulltime + 1

        if (dataList[i]["status_kepegawaian"]=="DOSEN PROFESIONAL PART TIME")
        // console.log("mashok2")
        pegawai_proparttime = pegawai_proparttime + 1


    }

}
console.log(pegawai_tetap)
console.log(pegawai_profulltime)
console.log(pegawai_proparttime)
console.log(pegawai_calonpegawaitetap)

const statusPegawai = {
    series: [{
        data: [pegawai_tetap, pegawai_calonpegawaitetap, pegawai_proparttime, pegawai_profulltime]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 100
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['TETAP', 'CALON TETAP', 'PRO PART TIME', 'PRO FULL TIME'
          ],
        }
      }
}

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40,70,20,90,36,80,30,91,60]
    }, {
        name: 'Store Customers',
        data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topCustomers = {
    head: [
        'user',
        'total orders',
        'total spending'
    ],
    body: [
        {
            "username": "john doe",
            "order": "490",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "250",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "120",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "110",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "80",
            "price": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
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
            <h6 className='margin-bottom'>Hi User1, Selamat datang kembali</h6>
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
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='bar'
                            height='100%'
                        />
                    </div>
                </div>
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
                <div className="col-6">
                    <div className="card full-height min-height-500">
                        {/* chart */}
                
                    </div>
                </div>
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
