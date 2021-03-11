class V1::LoginController < ApplicationController
  def index
    
  end
  def create
    user = User.find_by(email: params[:email])
    password = User.find_by(password: params[:password])
    if user.present? && password.present?
      render json: user
    else
      render json:'Invalid email or password'
    end
  end
end
