class Api::HoldingsController < ApplicationController
    def index()
        @holdings = User.find(params[:id]).holdings
        render :index
    end
end
