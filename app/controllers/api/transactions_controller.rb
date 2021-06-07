class Api::TransactionsController < ApplicationController
    def index()
        @transactions = User.find(params[:id]).transactions
        render :index
    end

    def create()
        parameters = transaction_params
        #Receiving/Buying Crypto, check if user has enough balance to purchase
        if parameters[:sender_id] == ''
            user = User.find(parameters[:receiver_id])
            if user.amount < parameters[:total].to_f
                render json: ["You do not have enough balance to cover this Purchase"], status: 401
            else
                user.update({amount: user.amount - parameters[:total].to_f})
                holding = user.holdings.find_by(crypto_id: parameters[:crypto_id])
                if holding == nil
                    Holding.create({user_id: parameters[:receiver_id], crypto_id: parameters[:crypto_id], amount: parameters[:amount].to_f})
                else
                    holding.update({amount: holding.amount + parameters[:amount].to_f})
                end
                render json: ["nice its been done"]
            end
        else
        #Selling/Buying Crypto, check if user has enough crypto to send
        end
    end

    def transaction_params
        params.require(:transaction).permit(:sender_id, :receiver_id, :crypto_id, :amount, :total)
    end
end
