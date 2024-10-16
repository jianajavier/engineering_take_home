class Building < ApplicationRecord
  belongs_to :client
  belongs_to :address
  has_many :building_custom_field_values, dependent: :destroy
end
