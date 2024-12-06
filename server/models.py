from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from server.config import bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key =True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    streakle_high_score = db.Column(db.Integer, default=0)
    streakle_high_streak = db.Column(db.Integer, default=0)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validates_username(self, key, username):
        if not username or len(username) < 5:
            raise ValueError('Username must be unique and at least 5 characters long')
        return username
    
    @validates('_password_hash')
    def validates_password(self, key, _password_hash):
        if not _password_hash or len(_password_hash) < 8:
            raise ValueError('Password must be at least 8 characters long.')
        return _password_hash
    
    def __repr__(self):
        return f'<Username: {self.username}'