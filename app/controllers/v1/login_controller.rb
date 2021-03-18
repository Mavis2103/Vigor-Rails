class V1::LoginController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index

  end
  def create
    user = User.find_by(email: params[:email])
    # password = User.find_by(password_digest: params[:password])
    if user.present? && user.authenticate(params[:password])
      # render json: user
      # render json:user.authenticate(params[:password])
      redirect_to root_path
    else
      render json:'Invalid email or password'
    end
  end
end
