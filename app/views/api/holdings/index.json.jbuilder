@holdings.each do |holding|
    json.set! holding.crypto_id do 
        json.extract! holding, :user_id, :crypto_id, :amount
    end
end