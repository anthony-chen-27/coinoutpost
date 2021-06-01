class CreateHoldings < ActiveRecord::Migration[5.2]
  def change
    create_table :holdings do |t|
      t.integer :user_id, null: false
      t.integer :crypto_id, null: false
      t.integer :amount, null: false
      t.timestamps
    end

    add_index :holdings, [:user_id, :crypto_id], unique: true
  end
end
