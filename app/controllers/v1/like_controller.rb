class V1::LikeController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    @post_id = Base64.decode64(params[:id]).split(',')
    @like = Like.select(:id,:user_id,:post_id)
    render json: {status: 'success',data: @comment,user_id: @user_token[0].id}
  end
  def create
    @post_id = params[:post_id]
    @user_id = @user_token[0].id
    if !@user_id.nil?
      insert = Like.create(user_id: @user_id, post_id: @post_id).valid
      if insert
        render json: {status: 'success'}
      else
        render json: {status: 'failed'}
      end
    end
  end
  def destroy
    @like = Like.find(params[:id])
    if @like.destroy
      flash[:success] = 'Comment was successfully deleted.'
      render json: {status: 'success'}
    else
      flash[:error] = 'Something went wrong'
      render json: {status: 'failed'}
    end
  end
  def update
    @like_count = Like.find_by(id: params[:post_id])
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
