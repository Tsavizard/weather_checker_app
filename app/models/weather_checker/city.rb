module WeatherChecker
  class City < ApplicationRecord
    has_many :temperatures, class_name: "Temperature", inverse_of: :city
  end
end