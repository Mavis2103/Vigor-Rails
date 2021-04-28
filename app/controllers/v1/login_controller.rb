class V1::LoginController < ApplicationController
  skip_before_action :verify_authenticity_token,:require_jwt,:decodeTokenSession,only:[:index,:create]
  before_action :checkSession
  def checkSession
    if !session[:token].nil?
      redirect_to '/v1/home'
    end
  end
  
  def index
    if(request.headers['Authorization'])
      render '/v1/home/index'
    end
  end
  def create
    @user = User.find_by(email: params[:email])
    # password = User.find_by(password_digest: params[:password])
    if @user.present? && @user.authenticate(params[:password])
      @userInfo = User.select("id,username,email").where("email = ?", params[:email]);
      @infoJson ={
        :email=> @userInfo[0].email,
        :username=> @userInfo[0].username,
        :id=>@userInfo[0].id
      }.to_json
      # token = JWT.encode(@userInfo,Rails.application.credentials.secret_key_base,'HS256')
      token = JWT.encode(@infoJson,'$2y$12$QAbW96324MCLhx3TYw4aketywiNUIuG4eg0mszV6Ry/ANCNLLXez6','HS256')
      session[:token] = token
      render json: {jwt: token,info:@infoJson}
      # render json: user
      # render json:user.authenticate(params[:password])
      # redirect_to root_path
    else
      render json:'Invalid'
    end
  end
end
