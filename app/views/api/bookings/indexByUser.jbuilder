json.bookings do
    json.array! @bookings do |booking|
        json.id booking.id
        json.start_date booking.start_date
        json.end_date booking.end_date
        json.property_id booking.property_id
        json.is_paid booking.is_paid?

        json.property do
            json.id booking.property.id
            json.title booking.property.title
            json.description booking.property.description
            json.city booking.property.city
            json.country booking.property.country
            json.property_type booking.property.property_type
            json.price_per_night booking.property.price_per_night
            json.max_guests booking.property.max_guests
            json.bedrooms booking.property.bedrooms
            json.beds booking.property.beds
            json.baths booking.property.baths
            json.image_url booking.property.image_url
        end
    end
end

