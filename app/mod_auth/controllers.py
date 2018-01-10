from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user

from app import db
from app.mod_auth.models import User

mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

@mod_auth.route('/signin/', methods=['POST'])
def signin():
    content = request.json
    if current_user.is_authenticated:
        return "", 204
    
    user = User.query.filter_by(username=content['username']).first()
    
    if user is None or not user.check_password(content['password']):
        return jsonify({"errorMessage": "Username or password does not exist."}), 401
    
    login_user(user, remember = True)
    return "", 200

@mod_auth.route('/register/', methods=['POST'])
def register():
    content = request.json
    errors = {}
    
    u = User(content['username'],
             content['email'],
             content['password'],
             content['fullname'],
             content['birthdate'],
             True, 
             content['agreed'])
    
    db.session.add(u)
    db.session.commit()

    return "", 204
    
