import string, random, re

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user
from sqlalchemy.exc import IntegrityError

from app import db
from app.modules.user import User
from app.modules.util.email.SMTPEmailer import SMTPEmailer

EMAIL_REGEX = r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"

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
    
    try:
        reg_email = re.match(EMAIL_REGEX,
                             content['email']).group(0)
        u = User(content['username'],
                 content['email'],
                 content['password'],
                 content['fullname'],
                 content['gender']) 
        
        db.session.add(u)
        db.session.commit()
    except IntegrityError as e:
        return jsonify({"errorMessage": "Account with email or username already exists."}), 409 # Conflict
    except AttributeError:
        return jsonify({"errorMessage": "Email was invalid."}), 400 # Bad Request

    return jsonify(u.serialize), 201 # Created

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
    else:
        return jsonify({"errorMessage": "Could not find specified email."}), 404 # Not Found


@mod_auth.route('/resetpassword/<code>', methods=['POST'])
def resetpassword(code):
    content = request.json
    user = User.query.filter_by(verify_code=code).first()
    
    if not user: return jsonify({"errorMessage": "Could not find account with specified code."}), 404 # Not Found
    
    if content['password'] == content['password2']:
        user.set_password(content['password'])
        user.verify_code = None
        db.session.commit()
        return "", 200
    else:
        return jsonify({"errorMessage": "Passwords do not match."}), 400

@mod_auth.route('/updateProfile/', methods=['POST'])
def updateProfile():
    content = request.json
    if current_user.is_authenticated:
        current_user.fullname = content['profileFullName']
        current_user.bio = content['profileBio']
        current_user.email = content['profileEmail']
        
        try:
            db.session.commit()
        except IntegrityError as e:
            return jsonify({"errorMessage": "Email is already in use."}), 409 # Conflict
        
    return "", 200

@mod_auth.route('/changePassword/', methods=['POST'])
def changePassword():
    content = request.json
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        
        if not current_user.check_password(content['oldPassword']):
            print "Wrong password."
            return jsonify({"errorMessage": "Wrong password."}), 401
        
        if content['newPassword1'] == content['newPassword2']:
            user.set_password(content['newPassword1'])
            db.session.commit()
            return "", 202
        else:
            return jsonify({"errorMessage": "Passwords do not match."}), 400
           
    print "Not logged in"     
    return "", 401

#methods for user data retrieval on profile display page    
@mod_auth.route('/getProfileEmail/', methods=['GET'])
def getProfileEmail():
    if current_user.is_authenticated:
        return User.query.get(current_user.id).email, 200
    else:
        return "", 401

@mod_auth.route('/getProfileFullName/', methods=['GET'])
def getProfileFullName():
    if current_user.is_authenticated:
        return User.query.get(current_user.id).fullname, 200
    else:
        return "", 401
    
@mod_auth.route('/getProfileCreationDate/', methods=['GET'])
def getProfileCreationDate():
    if current_user.is_authenticated:
        profileInfo = User.query.get(current_user.id).date_created
        creationDate = profileInfo.strftime('%d/%m/%Y')
        return creationDate, 200
    else:
        return "", 401

@mod_auth.route('/getProfileBio/', methods=['GET'])
def getProfileBio():
    if current_user.is_authenticated:
        bio = User.query.get(current_user.id).bio
        return bio if bio else "", 200
    else:
        return "", 401
    