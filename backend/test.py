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
for r in td_r:
     no = td_r['no'].all()
     kode_nama = td_r['kode_nama'].all()
     kode = td_r['kode'].all()
     no_urut = td_r['no_urut'].all()
     program_studi = td_r['program_studi'].all()
     status_kepegawaian = td_r['status_kepegawaian'].all()
     jfa = td_r['jfa'].all()
     dik_diakui = td_r['dik_diakui'].all()
     lit_diakui = td_r['lit_diakui'].all()
     abdimas_diakui = td_r['abdimas_diakui'].all()
     penunjang = td_r['penunjang'].all()
     prof_diakui = td_r['prof_diakui'].all()
     total_sks = td_r['total_sks'].all()
     pemenuhan_tridarma = td_r['pemenuhan_tridarma'].all()
     cluster = td_r['cluster'].all()
     values = (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma,cluster)

# query_insert = "INSERT INTO 'DB'.'hasil_cluster' (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma, cluster) VALUES (1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)" 
# textwrap.dedent(
# '''
#         INSERT INTO movies_data hasil_cluster (no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma, cluster)
#             VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
# ''')
session.execute('INSERT INTO hasil_cluster '
               '(no, kode_nama, kode, no_urut, program_studi, status_kepegawaian, jfa, dik_diakui, lit_diakui, abdimas_diakui, penunjang, prof_diakui, total_sks, pemenuhan_tridarma, cluster) '
               'VALUES (1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)')
# session.commit()
# session.execute(query_insert,values)

session.commit()
session.close()

# (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
# class Data(db.Model):
#     __tablename__ = 'data'
#     no = db.Column(db.Integer, primary_key=True)
#     kode_nama = db.Column(db.String)
#     kode = db.Column(db.String)
#     no_urut = db.Column(db.Integer)
#     program_studi = db.Column(db.String)
#     status_kepegawaian = db.Column(db.String)
#     jfa = db.Column(db.String)
#     dik_diakui = db.Column(db.Float)
#     lit_diakui = db.Column(db.Float)
#     abdimas_diakui = db.Column(db.Float)
#     penunjang = db.Column(db.Float)
#     prof_diakui = db.Column(db.Float)
#     total_sks = db.Column(db.Float)
#     pemenuhan_tridarma = db.Column(db.String)

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