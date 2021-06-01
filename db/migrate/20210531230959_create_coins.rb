class CreateCoins < ActiveRecord::Migration[5.2]
  def change
    create_table :coins do |t|
      t.string :name, null: false
      t.string :shorthand, null: false
      t.string :image_url , null: false

      t.timestamps
    end
    add_index :coins, :name, unique: true
  end
end
