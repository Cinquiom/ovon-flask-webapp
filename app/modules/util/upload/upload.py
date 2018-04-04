import os

from flask import request, Blueprint, send_from_directory
from flask_login import current_user
from flask_uploads import UploadSet, IMAGES, configure_uploads,UploadNotAllowed
from app import app, db
from app.modules.user import User

mod_uploads = Blueprint('upload', __name__)

DOCUMENTS = tuple('pdf rtf odf odt doc docx'.split())

avatars = UploadSet('avatars', IMAGES)
resumes = UploadSet('resumes', DOCUMENTS)

configure_uploads(app, (avatars, resumes))

@mod_uploads.route('/api/upload/', methods=['POST'])
def upload():
    if not current_user.is_authenticated: return "", 401
    try:
        if 'avatar' in request.files:
            filename = avatars.save(request.files['avatar'])
            current_user.avatar = filename
        elif 'resume' in request.files:
            filename = resumes.save(request.files['resume'])
            current_user.resume = filename
    except UploadNotAllowed:
        return "", 400
    
    db.session.commit()
    return "", 204
@mod_uploads.route('/api/avatars/<int:user_id>/', methods=['GET'])
@mod_uploads.route('/api/avatars/<int:user_id>/<string:filename>', methods=['GET'])
def show_avatar(user_id, filename=None):
    user = User.query.get(user_id)
    if user.avatar is None:
        return send_from_directory(os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'avatars'), "default.png")
    return send_from_directory(os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'avatars'), user.avatar)

@mod_uploads.route('/api/resumes/<int:user_id>/', methods=['GET'])
@mod_uploads.route('/api/resumes/<int:user_id>/<string:filename>', methods=['GET'])
def show_resume(user_id, filename=None):
    user = User.query.get(user_id)
    if user.resume is None:
        return "", 404
    return send_from_directory(os.path.join(app.config['UPLOADS_DEFAULT_DEST'], 'resumes'), user.resume)