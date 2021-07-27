module WeatherChecker
  class CitySerializer < ActiveModel::Serializer
    attributes :id, :is_included, :name, :temperatures

    def temperatures
      temperature_aggregations = object.temperatures
                    .select('MIN(temperatures.value) as min_temp, MAX(temperatures.value) as max_temp, AVG(temperatures.value) as avg_temp')
                    .first

      {
        min: temperature_aggregations['min_temp'] || '-',
        max: temperature_aggregations['max_temp'] || '-',
        avg: temperature_aggregations['avg_temp'] || '-',
        last: object.temperatures.order('temperatures.created_at DESC').pluck(:value).first || '-'
      }
    end
  end
end