Rails.application.routes.draw do
  scope module: 'weather_checker' do
    resources :cities, only: [:create, :destroy], key: :city_name
    get 'temperatures', to: 'temperatures#check_all'

    root to: 'home#index'
  end
end
