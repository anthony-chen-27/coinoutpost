class Api::TransactionsController < ApplicationController
    def index()
        @transactions = User.find(params[:id]).transactions
        render :index
    end

    def create()
        
    end

    def params
        params.require(:transaction).permit(:sender_id, :receiver_id, :crypto_id, :amount)
    end
end
