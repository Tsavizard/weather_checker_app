module WeatherChecker
  class Temperature < ApplicationRecord
    belongs_to :city, inverse_of: :temperatures
  end
end