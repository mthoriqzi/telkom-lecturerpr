#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn_extra.cluster import KMedoids
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA #Principal Component Analysis
#plotly imports
import plotly as py
import plotly.express as px
import plotly.graph_objs as go
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
#mysql
import pymysql
from sqlalchemy import create_engine
import mysql.connector

engine = create_engine('mysql://root:password@127.0.0.1/DB')
cursor = engine.connect()




td = pd.read_sql("SELECT * FROM data", engine)
td_drop = td.dropna() 
td_r = td_drop.rename(columns={"Dik Diakui":"D1", "Lit Diakui":"D2", "Abdimas Diakui":"D3", "Penunjang":"P"})
td_x =td_r.iloc[:,7:11] 
x_array = np.array(td_x)
kmedoids = KMedoids(n_clusters = 3, random_state=42)
kmedoids.fit(x_array)
td_x["cluster"] = kmedoids.labels_
td_r["cluster"] = kmedoids.labels_
td_rs = td_r.sort_values(['cluster'], ascending = False)
pca_1d = PCA(n_components=1)
pca_2d = PCA(n_components=2)
pca_3d = PCA(n_components=3)
PCs_1d = pd.DataFrame(pca_1d.fit_transform(td_x.drop(["cluster"], axis=1)))
PCs_2d = pd.DataFrame(pca_2d.fit_transform(td_x.drop(["cluster"], axis=1)))
PCs_3d = pd.DataFrame(pca_3d.fit_transform(td_x.drop(["cluster"], axis=1)))
PCs_1d.columns = ["PC1_1d"]
PCs_2d.columns = ["PC1_2d", "PC2_2d"]
PCs_3d.columns = ["PC1_3d", "PC2_3d", "PC3_3d"]
td_x = pd.concat([td_x,PCs_1d,PCs_2d,PCs_3d], axis=1, join='inner')

cluster0 = td_x[td_x["cluster"] == 0]
cluster1 = td_x[td_x["cluster"] == 1]
cluster2 = td_x[td_x["cluster"] == 2]
# init_notebook_mode(connected=True)
td_r.to_csv('hasil clustering.csv', index= False)

cursor.execute = ("create table hasil_cluster (no int, kode_nama varchar(255), kode varchar(255), no_urut int, program_studi varchar(255), status_kepegawaian varchar(255), jfa varchar(255), dik_diakui double, lit_diakui double, abdimas_diakui double, penunjang double, prof_diakui double, total_sks double, pemenuhan_tridarma varchar(255), cluster int)")
for r in td_r:
     no = td_r['no']
     kode_nama = td_r['kode_nama']
     kode = td_r['kode']
     no_urut = td_r['no_urut']
     program_studi = td_r['program_studi']
     status_kepegawaian = td_r['status_kepegawaian']
     jfa = td_r['jfa']
     dik_diakui = td_r['dik_diakui']
     lit_diakui = td_r['lit_diakui']
     abdimas_diakui = td_r['abdimas_diakui']
     penunjang = td_r['penunjang']
     prof_diakui = td_r['prof_diakui']
     total_sks = td_r['total_sks']
     pemenuhan_tridarma = td_r['pemenuhan_tridarma']
     cluster = td_r['cluster']
     values = (no , kode_nama , kode , no_urut , program_studi , status_kepegawaian , jfa , dik_diakui , lit_diakui , abdimas_diakui , penunjang , prof_diakui , total_sks, pemenuhan_tridarma , cluster )
cursor.execute = ("Insert into hasil_cluster ((no , kode_nama , kode , no_urut , program_studi , status_kepegawaian , jfa , dik_diakui , lit_diakui , abdimas_diakui , penunjang , prof_diakui , total_sks , pemenuhan_tridarma , cluster) VALUES (%s, %s,%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s,%s")
cursor.close()
conn.commit()
conn.close()
print ("Data Import Successful")

     

# sql = "LOAD DATA LOCAL INFILE \'hasil clustering.csv\' \
#     INTO TABLE hasil_clustering FIELDS TERMINATED BY \',\' ENCLOSED BY \'\"\' \
#     (`" +cols + "`)"
# cursor.execute(sql)




# print(kmedoids.cluster_centers_)

# print(x_array)

# fig = px.scatter_matrix(td_x,
# width=1200, height=1600)

# print(td.isnull().sum())