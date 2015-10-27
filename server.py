# -*- coding: utf-8 -*-
"""
    Ammo Test

"""
import socket, time, string, struct
from flask import Flask, jsonify, render_template, request, json
from flask.ext.socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yellow'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app, '192.168.0.12', 4000)

