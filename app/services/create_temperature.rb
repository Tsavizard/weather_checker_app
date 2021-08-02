class CreateTemperature

  def self.call_for_cities(city_names)
    cities = WeatherChecker::City.included.where(name: city_names)
    checker_api = Api::TemperatureFetcher.new

    results = cities.map do |city|
      response = checker_api.get_weather_for_city(city.name)
      temperature = city.temperatures.create(value: response['main']['temp'])

      reading = {}
      city_temperatures = city.temperatures.reload
                                           .select('MIN(temperatures.value) as min_temp, MAX(temperatures.value) as max_temp, AVG(temperatures.value) as avg_temp')
                                           .first
      reading[city.name] = {
        min: temperature_aggregations['min_temp'],
        max: temperature_aggregations['max_temp'],
        avg: temperature_aggregations['avg_temp'],
        last: temperature.value
      }
      reading
    end

  rescue
    { error: 'Error connecting to API', status_code: 500 }
  end
end