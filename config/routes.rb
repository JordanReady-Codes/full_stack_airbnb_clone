Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id'              => 'static_pages#property'
  get '/login'                     => 'static_pages#login'
  get '/newListing'                => 'static_pages#newListing'
  get '/listings'                  => 'static_pages#listings'
  get '/bookings'                  => 'static_pages#bookings'
  get '/booking/:id/success'       => 'static_pages#paymentSuccess'
  get '/logout'                    => 'static_pages#logout'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/authenticated'           => 'sessions#authenticated'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'

    # Stripe webhook
    post '/charges/mark_complete'  => 'charges#mark_complete'

  end

end
