class V1::LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authorized, only: [:auto_login]
  def index

  end
  def create
    @user = User.find_by(email: params[:email])
    # password = User.find_by(password_digest: params[:password])
    if @user.present? && @user.authenticate(params[:password])
      token = JWT.encode({test:'example'},Rails.application.credentials.secret_key_base,'HS256')
      session[:token]= token
      render json: {jwt: token}
      # render json: user
      # render json:user.authenticate(params[:password])
      # redirect_to root_path
    else
      render json:'Invalid email or password'
    end
  end
end
