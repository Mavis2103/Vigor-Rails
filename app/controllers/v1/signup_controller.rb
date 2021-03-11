class V1::SignupController < ApplicationController
  def index
    @signup = User.all;
    # render templates:""
  end
end
