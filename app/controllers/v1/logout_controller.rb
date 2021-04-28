class V1::LogoutController < ApplicationController
  before_action :logout
  def logout
    session.delete(:token)
  end
  def index
    redirect_to '/v1/login'
  end
end
