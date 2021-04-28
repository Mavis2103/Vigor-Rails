class ApplicationController < ActionController::Base
  before_action :require_jwt
  before_action :decodeTokenSession
  def decodeTokenSession
    if !session[:token].nil?
      decoded_token = JWT.decode(session[:token],'$2y$12$QAbW96324MCLhx3TYw4aketywiNUIuG4eg0mszV6Ry/ANCNLLXez6',true)
      json_data = JSON.parse(decoded_token[0])
      @user_session = User.where(email: json_data["email"], username: json_data["username"],)
    else
      redirect_to '/'
    end
  end
  
  def require_jwt
    token  = request.headers['Authorization']
    if !!token
      if valid_token(token)
        p 'authorized'
      else
        p 'khong ton tai user'
      end
    else
      p 'unauthorized'
    end
  end
  private
    def valid_token(token)
      valided_token = token.gsub('Bearer ','')
      begin
        decoded_token = JWT.decode(valided_token,'$2y$12$QAbW96324MCLhx3TYw4aketywiNUIuG4eg0mszV6Ry/ANCNLLXez6',true)
        json_data = JSON.parse(decoded_token[0])
        @user_token = User.where(email: json_data["email"], username: json_data["username"],)
        if @user_token.present?
          return true
        else
          return false
        end
      # rescue => Exception
      #   Rails.logger.warn "Error decoding token "+e.to_s
      end
    end
    # def token_param
    #   params.require(:home).permit(:content)
    # end
end
