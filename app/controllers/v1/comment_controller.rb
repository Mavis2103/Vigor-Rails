class V1::CommentController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    @post_id = Base64.decode64(params[:id]).split(',')
    @comment = Comment.select(:id,:text,:user_id,:username,:post_id,:created_at).joins(:user).where(post_id: [@post_id]).order(created_at: :asc)
    render json: {status: 'success',data: @comment,user_id: @user_token[0].id}
  end
  def create
    @post_id = params[:post_id]
    @user_id = @user_token[0].id
    @content_cmt = params[:content_cmt]
    if !@content_cmt.nil?
      insert = Comment.create(post_id: @post_id, user_id: @user_id, text: @content_cmt).valid?
      if insert
        render json: {status: 'success'}
      else
        render json: {status: 'failed'}
      end
    end
  end
  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      flash[:success] = 'Comment was successfully deleted.'
      render json: {status: 'success'}
    else
      flash[:error] = 'Something went wrong'
      render json: {status: 'failed'}
    end
  end
  def update
    @cmt = Comment.find_by(id: params[:id])
    if @cmt.update(text: params[:content_cmt])
      render json:{status:'success'}
    else
      render json:{status:'failed'}
    end
  end
  
  private
    def param_data
      params.require(:comment).permit(:post_id, :content_cmt)
    end
end
