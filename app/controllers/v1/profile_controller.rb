class V1::ProfileController < ApplicationController
  def index
    @post = Post.select(:id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc)
  end
end
