Rails.application.routes.draw do
  scope module: 'weather_checker' do
    root to: 'home#index'
  end
end
