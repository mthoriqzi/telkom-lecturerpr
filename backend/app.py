import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'mysql://root:password@localhost:3306/DB' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Data(db.Model):
    __tablename__ = 'data'
    no = db.Column(db.Integer, primary_key=True)
    kode_nama = db.Column(db.String)
    kode = db.Column(db.String)
    no_urut = db.Column(db.Integer)
    program_studi = db.Column(db.String)
    status_kepegawaian = db.Column(db.String)
    jfa = db.Column(db.String)
    dik_diakui = db.Column(db.Float)
    lit_diakui = db.Column(db.Float)
    abdimas_diakui = db.Column(db.Float)
    penunjang = db.Column(db.Float)
    prof_diakui = db.Column(db.Float)
    total_sks = db.Column(db.Float)
    pemenuhan_tridarma = db.Column(db.String)

#routes

@app.route('/')
def index():
    try:
        datas = Data.query.filter_by(style='mini').order_by(Data.name).all()
        data_text = '<ul>'
        for data in datas:
            data_text += '<li>' + data.name + ', ' + data.color + '</li>'
        data_text += '</ul>'
        return data_text
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)