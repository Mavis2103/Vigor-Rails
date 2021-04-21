class V1::HomeController < ApplicationController
  skip_before_action :verify_authenticity_token,only: [:create,:index]
  def index
    @select = Post.select(:id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc)
    # File.open("file/image/#{@posts[0].selectedImgFile}","rb"){ |io| io.read }
  end
  def create
    @image = params[:image]
    @video = params[:video]
    @audio = params[:audio]
    @type = params[:type]
    @content = params[:content]
    uuid = UUID.new
    rs = false
    if !@image.nil?
      @nameFile = uuid.generate
      data_url = @image
      image   = Base64.decode64(data_url["data:image/#{@type};base64,".length .. -1])
      File.open("public/file/image/#{@nameFile}.#{@type}", 'wb') { |f| f.write(image) }
      rs = Post.create(title: @content,selectedImgFile: "#{@nameFile}.#{@type}",user_id: @check[0].id).valid?
    end
    if !@video.nil?
      @nameFile = uuid.generate
      data_url = @video
      video   = Base64.decode64(data_url["data:video/#{@type};base64,".length .. -1])
      File.open("public/file/video/#{@nameFile}.#{@type}", 'wb') { |f| f.write(video) }
      rs =  Post.create(title: @content,selectedVidFile: "#{@nameFile}.#{@type}",user_id: @check[0].id).valid?
    end
    if !@audio.nil?
      @nameFile = uuid.generate
      data_url = @audio
      audio   = Base64.decode64(data_url["data:audio/#{@type};base64,".length .. -1])
      File.open("public/file/audio/#{@nameFile}.#{@type}", 'wb') { |f| f.write(audio) }
      rs =  Post.create(title: @content,selectedAudFile: "#{@nameFile}.#{@type}",user_id: @check[0].id).valid?
    end
    if !@content.nil?&& !!@image.nil?&& !!@video.nil? && !!@audio.nil?
      rs = Post.create(title: @content,user_id: @check[0].id).valid?
    end
    if rs
      render json:{status:'success'}
    else
      render json:{status:'failed'}
    end
  end
  
  private
    def param_data
      params.require(:home).permit(:content,:image,:video,:audio,:type)
    end
end
