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
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    if session
      render 'newListing'
    else
      redirect_to '/login'
    end
  end

  def listings
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    if session
      render 'listings'
    else
      redirect_to '/login'
    end
  end

  def bookings
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)
    if session
      render 'bookings'
    else
      redirect_to '/login'
    end
  end

  def paymentSuccess
    @data = { booking_id: params[:id] }.to_json
    render 'paymentSuccess'
  end

  def logout
    render 'logout'
  end

  def editListing
    @data = { property_id: params[:id] }.to_json
    render 'editListing'
  end

  def propertyBookings
    @data = { property_id: params[:id] }.to_json
    render 'propertyBookings'
  end
end
