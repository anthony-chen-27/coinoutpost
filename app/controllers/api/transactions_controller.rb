class Api::TransactionsController < ApplicationController
    def index()
        @transactions = User.find(params[:id]).transactions.order(:created_at)
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
                @transaction = Transaction.create({sender_id: nil, receiver_id: parameters[:receiver_id], crypto_id: parameters[:crypto_id], amount: parameters[:amount].to_f})
                render :show
            end
        #Selling Crypto, check that user has enough cryptos to sell
        else
            user = User.find(parameters[:sender_id])
            holding = user.holdings.find_by(crypto_id: parameters[:crypto_id])
            if holding == nil
                render json: ["You don't even own this crypto"], status: 401
            else
                if holding.amount < parameters[:amount].to_f 
                    render json: ["You don't own enough of this crypto to sell"], status: 401
                else
                    user.update({amount: user.amount + parameters[:total].to_f})
                    holding.update({amount: holding.amount - parameters[:amount].to_f})
                    @transaction = Transaction.create({sender_id: parameters[:sender_id], receiver_id: nil, crypto_id: parameters[:crypto_id], amount: parameters[:amount].to_f})
                    render :show
                end
            end
        end
    end

    def transaction_params
        params.require(:transaction).permit(:sender_id, :receiver_id, :crypto_id, :amount, :total)
    end
end
