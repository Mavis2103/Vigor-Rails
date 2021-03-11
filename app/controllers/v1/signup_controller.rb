class V1::SignupController < ApplicationController
  def index
    @signup = User.all;
    # render json: @signup,status: 200
    # render templates:""
  end
end
