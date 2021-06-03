@watching.each do |watch|
    json.set! watch.crypto_id do 
        json.extract! watch, :id, :user_id, :crypto_id
    end
end