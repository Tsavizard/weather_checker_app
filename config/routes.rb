Rails.application.routes.draw do
  scope module: 'weather_checker' do
    resources :cities, only: [:index, :update]
    resources :temperatures, only: [:index, :create]

    root to: 'home#index'
  end
end
