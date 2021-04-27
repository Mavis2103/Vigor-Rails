class V1::LikeController < ApplicationController
  skip_before_action :verify_authenticity_token,only: [:create,:index,:update]
  def index
    @like = Like.select(:id,:user_id,:post_id)
  end
  def create
    @post_id = params[:post_id]
    @user_id = @user_token[0].id
    @like_countNo = params[:user_id]
    if !@like_countNo.nil?
      insert = Like.create(user_id: @user_id, post_id: @post_id).valid
      if insert
        render json: {status: 'success'}
      else
        render json: {status: 'failed'}
      end
    end
  end
  def update
    @like_count = Like.find_by(id: params[:id])
    if @like_count.update(user_id: params[:user_id])
      render json:{status:'success'}
    else
      render json:{status:'failed'}
    end
  end

  private
    def param_data
      params.require(:like).permit(:user_id, :post_id)
    end
end
