class CreateBuildingCustomFieldValue < ActiveRecord::Migration[7.2]
  def change
    create_table :building_custom_field_values do |t|
      t.references :building, null: false, foreign_key: true
      t.references :client_custom_field, null: false, foreign_key: true
      t.string :value, null: false

      t.timestamps
    end
  end
end
