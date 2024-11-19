from flask import Flask, render_template, request, session
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Resource, Api
import os
from models import User
from config import app, db, api

app = Flask(__name__)

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

class ClearSession(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
api.add_resource(ClearSession, '/clear_session')

class Signup(Resource):
    def post(self):
        username = request.get_json()['newUsername']
        password = request.get_json()['newPassword']

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            return new_user.to_dict(), 201
        return {'error':'422, Unprocessable Entity'}, 422
    
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first

        if not username or not password:
            return {'error':'400 Bad request'}, 400
        
        if not user:
            return {'error': '404 user not found'}, 404

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error':'401 Unauthorized'}, 401
    
api.add_resource(Login, '/login')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=(True))