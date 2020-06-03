Rails.application.routes.draw do
  devise_for :users
  get '/allproducts', action: :index, controller: 'home'
  resources :products
  get 'home/index'
  root 'home#index'
  get '/cart', action: :index, controller: 'home'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end