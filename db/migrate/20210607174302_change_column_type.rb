class ChangeColumnType < ActiveRecord::Migration[5.2]
  def change
    change_column :holdings, :amount, :float
    change_column :transactions, :amount, :float
    change_column :users, :amount, :float
  end
end
