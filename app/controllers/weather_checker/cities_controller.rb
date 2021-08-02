module WeatherChecker
  class CitiesController < ApplicationController
    def create
      city = WeatherChecker::City.excluded.find_by(name: params[:city_name])

      respond_to do |format|
        format.json do
          if city && city.update(is_included: true)
            render json: { success: true }
          else
            render json: { success: false, error_message: 'City not found or already included' }
          end
        end
      end
    end

    def destroy
      city = WeatherChecker::City.included.find_by(name: params[:city_name])

      respond_to do |format|
        format.json do
          if city && city.update(is_included: false)
            render json: { success: true }
          else
            render json: { success: false, error_message: 'City not found or was not included' }
          end
        end
      end
    end
  end
end