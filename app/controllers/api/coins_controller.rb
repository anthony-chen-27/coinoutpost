class Api::CoinsController < ApplicationController
    def index()
        @coins = Coin.all
        render :index
    end
end
