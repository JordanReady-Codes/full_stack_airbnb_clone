class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :property
  has_many :charges, dependent: :destroy

  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :user, presence: true
  validates :property, presence: true

  before_validation :check_start_date_smaller_than_end_date
  before_validation :check_availability

  def is_paid?
    charges.pluck(:complete).include?(true)
  end

  def check_property_destroy
    if property.destroyed?
      Booking.where(id: property.id).destroy_all
    end
  end

  private

  def check_start_date_smaller_than_end_date
    return unless start_date > end_date

    raise ArgumentError, 'start date cannot be larger than end date'
  end

  def check_availability
    overlapped_bookings = property.bookings.where('start_date < ? AND end_date > ? ', end_date, start_date)
    exact_booking = property.bookings.where('start_date = ? AND end_date = ? ', start_date, end_date)
    return unless overlapped_bookings.count.positive? || exact_booking.count.positive?

    raise ArgumentError, 'date range overlaps with other bookings'
  end
end
