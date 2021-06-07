@transactions.each do |transact|
    json.set! transact.id do 
        json.extract! transact, :sender_id, :receiver_id, :crypto_id, :amount, :created_at
    end
end