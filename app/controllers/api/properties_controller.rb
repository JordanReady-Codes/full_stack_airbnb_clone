module Api
    class PropertiesController < ApplicationController
      def index
        @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
        return render json: { error: 'not_found' }, status: :not_found if !@properties
  
        render 'api/properties/index', status: :ok
      end
  
      def show
        @property = Property.find_by(id: params[:id])
        return render json: { error: 'not_found' }, status: :not_found if !@property
  
        render 'api/properties/show', status: :ok
      end

      def create
        token = cookies.signed[:airbnb_session_token]
        session = Session.find_by(token: token)
        user = session.user
        @property = user.properties.new(property_params)
        if @property.save
          render :show, status: :created
        else
          render json: {error: 'unable to create property'}
        end
      end

      def index_by_user
        token = cookies.signed[:airbnb_session_token]
        session = Session.find_by(token: token)
        user = session.user
        if user
          @properties = user.properties
          render 'api/properties/index', status: :ok
        else
          render json: {error: 'unable to find user'}
        end
      end

      private

        def property_params
          params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image_url)
        end

    end
  end