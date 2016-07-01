module Api
  class UsersController < ApiController
    def show
      @user = User.find(params[:id])
      render :show
    end

    def create
      @user = User.new(user_params)
      if @user.save
        log_in(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entitiy
      end
    end

    protected
    def user_params
      params.require(:user).permit(:email, :password, :email_confirmation, :password_confirmation)
    end

  end
end
