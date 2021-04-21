class V1::CommentController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    @post_id = params[:post_id]
    @user_id = @user_token[0].id
    @content_cmt = params[:content_cmt]
    if !@content_cmt.nil?
      insert = Comment.create(post_id: @post_id, user_id: @user_id, text: @content_cmt).valid
      if insert
        render json: {status: 'success'}
      else
        render json: {status: 'failed'}
      end
    end
  end
  private
    def param_data
      params.require(:comment).permit(:post_id, :content_cmt)
    end
end
