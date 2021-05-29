class Api::SessionsController < ApplicationController
    def create()
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login(@user)
            render json: {id: @user.id, username: @user.username}
        else
            render json: ["Invalid login information"], status: 401
        end
    end

    def destroy()
        if logged_in?
            logout()
            render json: {}
        else
            render json: ["Nobody signed in"], status: 404
        end
    end
end
