module WeatherChecker
  class City < ApplicationRecord
    has_many :temperatures, class_name: "Temperature", inverse_of: :city

    scope :included_only, -> {where(is_included: true)}
    scope :excluded_only, -> {where(is_included: false)}

  end
end