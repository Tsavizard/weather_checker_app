module WeatherChecker
  class TemperaturesController < ApplicationController
    def check_all
      city_names = Array.wrap(params[:city_names])
      results = ::CreateTemperature.call_for_cities(city_names)

      respond_to do |format|
        format.json do
          render json: { res: results }
        end
      end
    end
  end
end