module WeatherChecker
  class Temperature < ApplicationRecord
    belongs_to :city
  end
end