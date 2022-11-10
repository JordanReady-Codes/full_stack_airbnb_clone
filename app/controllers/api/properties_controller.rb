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
        @property = Property.new(property_params)
        @property.user = current_user
        if @property.save
          render :show, status: :created
        else
          render json: @property.errors, status: :unprocessable_entity
        end
      end

      private
        def set_property
          @property = Property.find(params[:id])
        end

        def property_params
          params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image_url)
        end

    end
  end