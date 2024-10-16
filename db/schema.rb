# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_16_012620) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "address1", null: false
    t.string "address2"
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.string "postal_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "building_custom_field_values", force: :cascade do |t|
    t.bigint "building_id", null: false
    t.bigint "client_custom_field_id", null: false
    t.string "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["building_id"], name: "index_building_custom_field_values_on_building_id"
    t.index ["client_custom_field_id"], name: "index_building_custom_field_values_on_client_custom_field_id"
  end

  create_table "buildings", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.bigint "address_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_buildings_on_address_id"
    t.index ["client_id"], name: "index_buildings_on_client_id"
  end

  create_table "client_custom_fields", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "name", null: false
    t.string "field_type", null: false
    t.json "enum_options"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_client_custom_fields_on_client_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "building_custom_field_values", "buildings"
  add_foreign_key "building_custom_field_values", "client_custom_fields"
  add_foreign_key "buildings", "addresses"
  add_foreign_key "buildings", "clients"
  add_foreign_key "client_custom_fields", "clients"
end
