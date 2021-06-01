# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create({username: 'hello', password: 'testing', first_name: 'William', last_name: 'Shi'})

Coin.create({name: 'bitcoin', shorthand: 'BTC', image_url: ' '})
Coin.create({name: 'ethereum', shorthand: 'ETH', image_url: ' '})
Coin.create({name: 'tether', shorthand: 'USDT', image_url: ' '})
Coin.create({name: 'cardano', shorthand: 'ADA', image_url: ' '})
Coin.create({name: 'dogecoin', shorthand: 'DOGE', image_url: ' '})
Coin.create({name: 'polkadot', shorthand: 'DOT', image_url: ' '})
Coin.create({name: 'uniswap', shorthand: 'UNI', image_url: ' '})
Coin.create({name: 'chainlink', shorthand: 'LINK', image_url: ' '})
Coin.create({name: 'litecoin', shorthand: 'LTC', image_url: ' '})
Coin.create({name: 'polygon', shorthand: 'MATIC', image_url: ' '})
Coin.create({name: 'solana', shorthand: 'SOL', image_url: ' '})
Coin.create({name: 'eos', shorthand: 'EOS', image_url: ' '})
Coin.create({name: 'sushi', shorthand: 'SUSHI', image_url: ' '})
Coin.create({name: 'dash', shorthand: 'DASH', image_url: ' '})
Coin.create({name: 'helium', shorthand: 'HNT', image_url: ' '})

Holding.create({user_id: 1, crypto_id: 3, amount: 20})
Holding.create({user_id: 1, crypto_id: 1, amount: 29})
Holding.create({user_id: 1, crypto_id: 7, amount: 26})
Holding.create({user_id: 1, crypto_id: 6, amount: 8720})


