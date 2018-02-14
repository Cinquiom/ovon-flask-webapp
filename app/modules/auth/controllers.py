import string, random

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user

from app import db
from app.modules.user import User
from app.modules.util.email.SMTPEmailer import SMTPEmailer

mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

@mod_auth.route('/signin/', methods=['POST'])
def signin():
    content = request.json
    
    user = User.query.filter_by(username=content['username']).first()
    
    if user is None or not user.check_password(content['password']):
        return jsonify({"errorMessage": "Username or password does not exist."}), 401
    
    login_user(user, remember = True)
    return "", 200

    if current_user.is_authenticated:
        return "", 204

@mod_auth.route('/register/', methods=['POST'])
def register():
    content = request.json
    errors = {}
    
    u = User(content['username'],
             content['email'],
             content['password'],
             content['fullname'],
             #content['birthdate'],
             True, 
             content['agreed'],
             True)
    
    db.session.add(u)
    db.session.commit()

    return "", 201 # Created

"""
    Returns the user's username.
    Quick and dirty route used for testing login.
"""

@mod_auth.route('/whoami/', methods=['GET'])
def whoami():
    if current_user.is_anonymous:
        return "anonymous"
    return current_user.username

@mod_auth.route('/forgotpassword/', methods=['POST'])
def forgotpassword():
    content = request.json
    user = User.query.filter_by(email=content['email']).first()
    if user:
        user.verify_code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(32))
        db.session.commit()
        SMTPEmailer().sendmail(user.username, content['email'], user.verify_code)
    return "", 202 # Always return successful, even if we don't find an email address

@mod_auth.route('/resetpassword/<code>', methods=['POST'])
def resetpassword(code):
    content = request.json
    user = User.query.filter_by(verify_code=code).first()
    if user and content['password'] == content['password2']:
        user.set_password(content['password'])
        db.session.commit()
    return "", 204

#methods for user data retrieval on profile display page    
@mod_auth.route('/getProfileEmail/', methods=['GET'])
def getProfileEmail():
    profileInfo = User.query.filter_by(username=request.cookies.get('userName')).first()['email']
    return profileInfo, 200

@mod_auth.route('/getProfileFullName/', methods=['GET'])
def getProfileFullName():
    profileInfo = User.query.filter_by(username=request.cookies.get('userName')).first()['fullname']
    return profileInfo, 200
    
@mod_auth.route('/getProfileCreationDate/', methods=['GET'])
def getProfileCreationDate():
    profileInfo = User.query.filter_by(username=request.cookies.get('userName')).first()['date_created']
    creationDate = profileInfo.strftime('%d/%m/%Y')
    return creationDate, 200