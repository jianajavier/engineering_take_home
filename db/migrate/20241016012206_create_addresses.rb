class CreateAddresses < ActiveRecord::Migration[7.2]
  def change
    create_table :addresses do |t|
      t.string :address1, null: false
      t.string :address2
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :postal_code, null: false

      t.timestamps
    end
  end
end
