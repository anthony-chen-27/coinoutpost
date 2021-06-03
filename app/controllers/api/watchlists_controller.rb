class Api::WatchlistsController < ApplicationController
    def index()
        @watching = User.find(params[:id]).watching
        render :index
    end

    def create()
        @watch = Watchlist.new(watch_params)
        if @watch.save
            render :watch
        else
            render json: @watch.errors.full_messages, status: 422
        end
    end

    def destroy()
        @watch = Watchlist.find(params[:id])
        if @watch
            @watch.destroy!
            render :watch
        else
            render json: ["Invalid action"], status: 404
        end
    end

    def watch_params
        params.require(:watch).permit(:user_id, :crypto_id)
    end
end
