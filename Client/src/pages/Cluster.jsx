
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid } from 'recharts';
import HasilCluster from '../components/hasilcluster/HasilCluster';
import React, { useState, useEffect, useRef } from 'react';




function Cluster() {
 
    const [clusterList, setClusterList] = useState([])
    
    useEffect(() => {
      axios.get('http://127.0.0.1:5000').then((response) => {
        setClusterList(response.data);
      });
      clusterList.setHeader("Access-Control-Allow-Origin", "*");
    }, []);
    console.log(clusterList)
    return (
        <ScatterChart width={400} height={400}>
        <CartesianGrid />
        <XAxis type="string" dataKey="kode_nama" />
        <YAxis type="number" dataKey="cluster" />
        <Scatter post={clusterList} fill="green" />
        </ScatterChart>

    )

}

export default Cluster