class ClientCustomField < ApplicationRecord
  belongs_to :client
  has_many :building_custom_field_values, dependent: :destroy

  enum field_type: { number: "NUMBER", freeform: "FREEFORM", enum_field: "ENUM" }

  validates :field_type, presence: true
end
