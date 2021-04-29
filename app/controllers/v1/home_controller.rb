class V1::HomeController < ApplicationController
  skip_before_action :verify_authenticity_token,only: [:create,:index,:destroy,:update]
  def index
    @select = Post.select(:id,:user_id,:username,:title,:selectedImgFile,:selectedVidFile,:selectedAudFile,:created_at).joins(:user).order(created_at: :desc)
    @comment = Comment.select(:id,:username,:text,:post_id,:user_id).joins(:user).order(created_at: :desc)
    @user = User.select(:id,:username,:profilePicture).where(id: @user_session[0].id)
    @like = Like.select(:id,:user_id,:post_id)
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
      rs = Post.create(title: @content,selectedImgFile: "#{@nameFile}.#{@type}",user_id: @user_token[0].id).valid?
    end
    if !@video.nil?
      @nameFile = uuid.generate
      data_url = @video
      video   = Base64.decode64(data_url["data:video/#{@type};base64,".length .. -1])
      File.open("public/file/video/#{@nameFile}.#{@type}", 'wb') { |f| f.write(video) }
      rs =  Post.create(title: @content,selectedVidFile: "#{@nameFile}.#{@type}",user_id: @user_token[0].id).valid?
    end
    if !@audio.nil?
      @nameFile = uuid.generate
      data_url = @audio
      audio   = Base64.decode64(data_url["data:audio/#{@type};base64,".length .. -1])
      File.open("public/file/audio/#{@nameFile}.#{@type}", 'wb') { |f| f.write(audio) }
      rs =  Post.create(title: @content,selectedAudFile: "#{@nameFile}.#{@type}",user_id: @user_token[0].id).valid?
    end
    if !@content.nil?&& !!@image.nil?&& !!@video.nil? && !!@audio.nil?
      rs = Post.create(title: @content,user_id: @user_token[0].id).valid?
    end
    if rs
      render json:{status:'success'}
    else
      render json:{status:'failed'}
    end
  end
  def destroy
    @post = Post.find(params[:id])
    if !@post.selectedImgFile.nil?
      p 'img'
      File.delete("public/file/image/#{@post.selectedImgFile}") if File.exist?("public/file/image/#{@post.selectedImgFile}")
    elsif !@post.selectedVidFile.nil?
      p 'video'
      File.delete("public/file/video/#{@post.selectedVidFile}") if File.exist?("public/file/video/#{@post.selectedVidFile}")
    elsif !@post.selectedAudFile.nil?
      p 'audi'
      File.delete("public/file/audio/#{@post.selectedAudFile}") if File.exist?("public/file/audio/#{@post.selectedAudFile}")
    end
    if @post.destroy
      flash[:success] = 'Post was successfully deleted.'
      render json:{status:'success'}
    else
      flash[:error] = 'Something went wrong'
      render json:{status:'failed'}
    end
  end
  def update
  #  statusFile
  # - 0 : không up file (tức chỉ sửa title)
  # - 1 : có upfile (kiểm tra type bên server)
  @post = Post.find_by(id: params[:id])
  if params[:statusFile]===0
    if @post.update(title: params[:title])
      render json:{status:'success'}
    else
      render json:{status:'failed'}
    end
  elsif params[:statusFile]===1
      uuid = UUID.new
      @nameFile = uuid.generate
      @typeFile = params[:typeFile]
      @dataFile = params[:file]
      writeFile(@nameFile,@typeFile,@dataFile)
      rs = false
      # if !@post.selectedImgFile.nil?
      #   p 'img'
      #   rs = @post.update_columns(title: params[:title],selectedImgFile: "#{@nameFile}.#{@typeFile}",selectedAudFile: '', selectedVidFile:'')
      # elsif !@post.selectedAudFile.nil?
      #   p 'aud'
      #   rs = @post.update_columns(title: params[:title],selectedAudFile: "#{@nameFile}.#{@typeFile}",selectedImgFile: '', selectedVidFile:'')
      # elsif !@post.selectedVidFile.nil?
      #   p 'vid'
      #   rs = @post.update_columns(title: params[:title],selectedVidFile: "#{@nameFile}.#{@typeFile}",selectedAudFile: '', selectedImgFile:'')
      # else
        case @typeFile
        when 'jpeg'||'jpg'||'png' #image
          rs = @post.update_columns(title: params[:title],selectedImgFile: "#{@nameFile}.#{@typeFile}",selectedAudFile: '', selectedVidFile:'')
        when 'mp4'||'webm' #video
          rs = @post.update_columns(title: params[:title],selectedVidFile: "#{@nameFile}.#{@typeFile}",selectedAudFile: '', selectedImgFile:'')
        when 'mp3' #audio
          rs = @post.update_columns(title: params[:title],selectedAudFile: "#{@nameFile}.#{@typeFile}",selectedImgFile: '', selectedVidFile:'')
        end
      # end
      if rs
        render json:{status:'success'}
      else
        render json:{status:'failed'}
      end
    end
  end
  def writeFile(uuid,typeFile,data)
    data_url = data
    case typeFile
    when 'jpeg'||'jpg'||'png' #image
      @data = Base64.decode64(data_url["data:image/#{typeFile};base64,".length .. -1])
      File.open("public/file/image/#{uuid}.#{typeFile}",'wb') { |f| f.write(@data)}
    when 'mp4'||'webm' #video
      @data = Base64.decode64(data_url["data:video/#{typeFile};base64,".length .. -1])
      File.open("public/file/video/#{uuid}.#{typeFile}",'wb') { |f| f.write(@data)}
    when 'mp3' #audio
      @data = Base64.decode64(data_url["data:audio/#{typeFile};base64,".length .. -1])
      File.open("public/file/audio/#{uuid}.#{typeFile}",'wb') { |f| f.write(@data)}
    end
  end

  private
    def param_data
      params.require(:home).permit(:content,:image,:video,:audio,:type,:file)
    end
end
