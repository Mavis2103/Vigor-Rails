class V1::LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index

  end
  def create
    user = User.find_by(email: params[:email])
    password = User.find_by(password_digest: params[:password])
    if user.present? && password.present?
      # render json: user
      redirect_to root_path
    else
      render json:'Invalid email or password'
    end
  end
end
