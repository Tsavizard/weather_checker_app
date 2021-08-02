require 'httparty'

class TemperatureFetcher
  include HTTParty

  API_KEY = Rails.configuration.open_weather_api_key

  def get_weather_for_city(city_name)
    res = HTTParty.get(request_by_city_path(city_name))
    res.parsed_response
  end

  private

  def request_by_city_path(city_name)
    "https://api.openweathermap.org/data/2.5/weather?q=#{city_name}&units=metric&appid=#{API_KEY}"
  end
end
