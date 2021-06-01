class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
    before_validation :ensure_session_token
    validates :password, length: {minimum: 6}, allow_nil: true

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save
        return self.session_token
    end

    attr_reader :password
    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        if user && user.is_password?(password)
            return user
        else
            return nil
        end
    end

    def is_password?(password)
        obj = BCrypt::Password.new(self.password_digest)
        obj.is_password?(password)
    end
end
