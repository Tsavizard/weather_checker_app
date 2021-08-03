class CreateTemperature

  def self.call_for_cities(city_names)
    cities = WeatherChecker::City.included_only.where(name: city_names)
    checker_api = TemperatureFetcher.new
    query = 'MIN(temperatures.value) as min_temp, MAX(temperatures.value) as max_temp, AVG(temperatures.value) as avg_temp'

    results = cities.map do |city|
      response = checker_api.get_weather_for_city(city.name)
      temperature = city.temperatures.create(value: response['main']['temp'])

      reading = {}
      city_temperatures = city.temperatures
                              .select(query)
                              .first
      reading[city.name] = {
        min: city_temperatures['min_temp'],
        max: city_temperatures['max_temp'],
        avg: city_temperatures['avg_temp'],
        last: temperature.value
      }
      reading
    end

  rescue => e
    { error: 'Error connecting to API', status_code: 500 }
  end
end