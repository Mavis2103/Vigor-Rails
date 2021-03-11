class V1::SignupController < ApplicationController
  def index
    @signup = User.all;
    # render json: @signup,status: 200
    # render templates:""
  end
  def create
    @email = params[:email]
    @username = params[:username]
    @password = params[:password]
    @newUser = User.new(email: @email, username: @username, password: @password)
    if @newUser.save
      render json: 'Completed',status:200
    else
      render json: 'Failed'
    end
  end
end
