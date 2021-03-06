class V1::ProfileController < ApplicationController
  skip_before_action :verify_authenticity_token,only: [:create,:index,:destroy,:update]

  def index
    @select = Post.select(:id,:user_id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc).where(user_id: @user_session[0].id)
    @post = Post.select(:id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc).where(user_id: @user_session[0].id)
    @user = User.select(:id,:username,:profilePicture).where(id: @user_session[0].id)
    @comment = Comment.select(:id,:username,:text,:post_id,:user_id).joins(:user).order(created_at: :desc)
    @like = Like.select(:id,:user_id,:post_id)
  end
end
