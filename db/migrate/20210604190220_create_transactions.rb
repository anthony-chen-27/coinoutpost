class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :sender_id, null: true
      t.integer :receiver_id, null: true
      t.integer :crypto_id, null: false
      t.integer :amount, null: false

      t.timestamps
    end
    add_index :transactions, :sender_id
    add_index :transactions, :receiver_id
  end
end
