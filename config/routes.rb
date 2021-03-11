Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root "login#index"
  # get "/login",to:"login#index"
  # get "/signup",to:"signup#index"
  namespace:v1 do
    resources :signup do
      member do
        post :createUser
      end
    end
    resources :login
  end
end
