module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date] })
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      @bookings = property.bookings.where('end_date > ? ', Date.today)
      render 'api/bookings/index'
    end

    def paymentSuccess
      @booking = Booking.find_by(id: params[:id])
      render status: :ok
    end

    def indexByUser
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @property = Property.find_by(id: params[:id])
      @bookings = Booking.where('user_id = ?', user)
      return render json: { error: 'not_found' }, status: :not_found unless @bookings

      render status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @booking

      render status: :ok
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date, :id)
    end
  end
end
