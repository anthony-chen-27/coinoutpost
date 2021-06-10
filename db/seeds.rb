# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create({username: 'hello', password: 'testing', first_name: 'William', last_name: 'Shi', amount: 200000})

Coin.create({name: 'bitcoin', shorthand: 'BTC', image_url: ' '})
Coin.create({name: 'ethereum', shorthand: 'ETH', image_url: ' '})
Coin.create({name: 'tether', shorthand: 'USDT', image_url: ' '})
Coin.create({name: 'cardano', shorthand: 'ADA', image_url: ' '})
Coin.create({name: 'dogecoin', shorthand: 'DOGE', image_url: ' '})
Coin.create({name: 'chainlink', shorthand: 'LINK', image_url: ' '})
Coin.create({name: 'litecoin', shorthand: 'LTC', image_url: ' '})
Coin.create({name: 'eos', shorthand: 'EOS', image_url: ' '})
Coin.create({name: 'dash', shorthand: 'DASH', image_url: ' '})
Coin.create({name: 'maker', shorthand: 'MKR', image_url: ' '})
Coin.create({name: 'tezos', shorthand: 'XTZ', image_url: ' '})
Coin.create({name: 'qtum', shorthand: 'QTUM', image_url: ' '})
Coin.create({name: 'waves', shorthand: 'WAVES', image_url: ' '})
Coin.create({name: 'decentraland', shorthand: 'MANA', image_url: ' '})
Coin.create({name: 'siacoin', shorthand: 'SC', image_url: ' '})
Coin.create({name: 'zilliqa', shorthand: 'ZIL', image_url: ' '})
Coin.create({name: 'filecoin', shorthand: 'FIL', image_url: ' '})
Coin.create({name: 'monero', shorthand: 'XMR', image_url: ' '})
Coin.create({name: 'decred', shorthand: 'DCR', image_url: ' '})


Holding.create({user_id: 1, crypto_id: 3, amount: 20})
Holding.create({user_id: 1, crypto_id: 1, amount: 29})
Holding.create({user_id: 1, crypto_id: 7, amount: 26})
Holding.create({user_id: 1, crypto_id: 6, amount: 8720})

Watchlist.create({user_id: 1, crypto_id: 3})
Watchlist.create({user_id: 1, crypto_id: 2})
Watchlist.create({user_id: 1, crypto_id: 8})
Watchlist.create({user_id: 1, crypto_id: 9})
Watchlist.create({user_id: 1, crypto_id: 1})
Watchlist.create({user_id: 1, crypto_id: 13})

Transaction.create({sender_id: 1, receiver_id: nil, crypto_id: 5, amount: 20, price: 503.3})
Transaction.create({sender_id: 1, receiver_id: nil, crypto_id: 6, amount: 27, price: 22.34})
Transaction.create({sender_id: 1, receiver_id: nil, crypto_id: 5, amount: 13, price: 202.2})
Transaction.create({sender_id: 1, receiver_id: nil, crypto_id: 9, amount: 269, price: 201.33})
Transaction.create({sender_id: nil, receiver_id: 1, crypto_id: 3, amount: 23, price: 1.05})
