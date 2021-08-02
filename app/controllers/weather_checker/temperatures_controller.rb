module WeatherChecker
  class TemperaturesController < ApplicationController
    def check_all
      city_names = Array.wrap(params[:city_names]&.split(','))
      results = ::CreateTemperature.call_for_cities(city_names)
      payload = { res: results } if results.kind_of? Array
      payload = { error: results[:error]} if results.kind_of? Hash

      respond_to do |format|
        format.json do
          render json: payload
        end
      end
    end
  end
end