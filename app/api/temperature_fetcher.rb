class TemperatureFetcher
  API_KEY = Rails.configuration.open_weather_api_key

  def get_weather_for_city(city)
  end

  def get_bulk_weather
  end

  private

  def bulk_path(bulk_file_name)
    "http://bulk.openweathermap.org/snapshot/#{BULK_FILE_NAME}?appid=#{API_KEY}"
  end

  def request_by_city_path(city_name)
    "api.openweathermap.org/data/2.5/weather?q=#{city_name}&appid=#{API_KEY}"
  end
end