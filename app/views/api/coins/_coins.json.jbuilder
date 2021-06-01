coins.each do |coin|
    json.set! coin.id do 
        json.extract! coin, :name, :shorthand, :image_url
    end
end