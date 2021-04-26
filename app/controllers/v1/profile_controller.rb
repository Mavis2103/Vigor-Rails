class V1::ProfileController < ApplicationController
  def index
    @select = Post.select(:id,:user_id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc)
    @post = Post.select(:id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc)
    @user = User.select(:id,:username,:profilePicture)
    @comment = Comment.select(:id,:username,:text,:post_id,:user_id).joins(:user).order(created_at: :desc)
  end
end
