class User < ApplicationRecord
  has_secure_password
  has_many :teams
  has_many :requests

  def to_token_payload
        {
            sub: id,
            email: email,
            username: username,
            age: age
        }
    end
end
