import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn_extra.cluster import KMedoids
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA #Principal Component Analysis
import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func
from sqlalchemy import create_engine
from sqlalchemy.sql import text
import textwrap
import time, datetime
from datetime import datetime
import json
from flask import Flask, request, jsonify

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost:3306/DB'
engine = create_engine('mysql://root:password@localhost:3306/DB')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
session = db.session()

td = pd.read_sql("SELECT * FROM data",engine)
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
td_r.to_csv('./hasil clustering.csv', index= False)
query_createtable = """ create table IF NOT EXISTS hasil_cluster (no int, kode_nama varchar(255), kode varchar(255), no_urut int, program_studi varchar(255), status_kepegawaian varchar(255), jfa varchar(255), dik_diakui double, lit_diakui double, abdimas_diakui double, penunjang double, prof_diakui double, total_sks double, pemenuhan_tridarma varchar(255), cluster int) """
session.execute(query_createtable)
session.commit()

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

data_values = ""

for r in range(0, len(td_r)):
    values = "(" + str(no[r]) +",'"+ kode_nama[r] +"','"+ kode[r] +"',"+ str(no_urut[r]) +",'"+ program_studi[r] +"','"+ status_kepegawaian[r] +"','"+ jfa[r] +"',"+ str(dik_diakui[r]) +","+ str(lit_diakui[r]) +","+ str(abdimas_diakui[r]) +","+ str(penunjang[r]) +","+ str(prof_diakui[r]) +","+ str(total_sks[r]) +",'"+ pemenuhan_tridarma[r] +"',"+ str(cluster[r]) + "), "
    data_values += values

session.execute("insert into hasil_cluster values " + data_values[:-2] + ";")
# session.execute('INSERT INTO hasil_cluster '
#                '(no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma, cluster) '
#                'VALUES (1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)')

session.commit()
session.close()

#routes
@app.route('/', methods=['POST', 'GET', 'DELETE'])
def users():
    # gets all users
    if request.method=='GET':

        df = pd.read_csv('hasil clustering.csv')
        return {'hasil clustering': df.to_dict()}, 200

# @app.route('/', methods=['POST'])
# def index():
#     try:
#         datas = td_r
#         data_text = '<ul>'
#         for data in datas:
#             data_text += '<li>' + data.no + ', ' + data.kode_nama + '</li>'
#         data_text += '</ul>'
#         return data_text
#     except Exception as e:
#         # e holds description of the error
#         error_text = "<p>The error:<br>" + str(e) + "</p>"
#         hed = '<h1>Something is broken.</h1>'
#         return hed + error_text



if __name__ == '__main__':
    app.run(debug=True)