class Event < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :event_start_date, presence: true
  validates :event_end_date, presence: true
  validate :one_day_event
  validate :start_of_hour
  validate :dates_diff
  validate :collapse_event

  def self.get_events_in_range(dates)
    where("event_end_date <= :event_end_date AND \
           event_start_date >= :event_start_date",
           dates)
  end

  private

  def one_day_event
    errors.add(:event, 'event in 1 day') if (event_end_date - event_start_date) / 1.day >= 1
  end

  def start_of_hour
    errors.add(:date, 'date must be in start of hour') if event_start_date.beginning_of_hour != event_start_date ||
                                                           event_end_date.beginning_of_hour != event_end_date
  end

  def dates_diff
      errors.add(:event, 'end date must be greater than start date') if (event_end_date - event_start_date) < 0
  end

  def collapse_event
    errors.add(:event, 'this event overide other event') if get_events_in_soft_range({
                                                                  event_end_date: event_end_date,
                                                                  event_start_date: event_start_date}).count != 0
  end

  def get_events_in_soft_range(dates)
    Event.where("event_end_date < :event_end_date AND \
           event_start_date > :event_start_date",
           dates)
  end
end
