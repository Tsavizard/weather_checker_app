module WeatherChecker
  class HomeController < ApplicationController
    def index
      @serialized_cities = WeatherChecker::City.all.map{|city| WeatherChecker::CitySerializer.new(city).as_json}
    end
  end
end