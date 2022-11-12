class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def newListing
    render 'newListing'
  end

  def listings
    render 'listings'
  end

  def bookings
    render 'bookings'
  end

  def paymentSuccess
    @data = { booking_id: params[:id] }.to_json
    render 'paymentSuccess'
  end

  def logout
    render 'logout'
  end


end
