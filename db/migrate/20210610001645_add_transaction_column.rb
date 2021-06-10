class AddTransactionColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :price, :float
  end
end
