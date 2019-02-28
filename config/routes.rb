Rails.application.routes.draw do
   scope '/api' do
    post 'user_token' => 'user_token#create'
    post '/users' => 'users#create'
    resources :teams do
      resources :requests
    end
    get '/my_teams', to: "dashboard#my_teams"
  get '/my_requests', to: "dashboard#my_requests"
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
