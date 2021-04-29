class V1::SignupController < ApplicationController
  skip_before_action :verify_authenticity_token,:require_jwt
  skip_before_action :decodeTokenSession
  def index
    @signup = User.all;
    # render json: @signup,status: 200
    # render templates:""
  end
  def create
    @email = params[:email]
    @username = params[:username]
    @password = params[:password]
    # @newUser = User.new(email: @email, username: @username, password: @password)
    begin
      @newUser = User.create(email: @email, username: @username, password: @password)
      if @newUser.save
        # render json: 'Completed',status:200
        redirect_to '/v1/login'
      else
        render json: 'Failed'
      end
    rescue ActiveRecord::RecordNotUnique => exception
      print exception
      render json: 'Email is already!!!'
    end
  end
end
