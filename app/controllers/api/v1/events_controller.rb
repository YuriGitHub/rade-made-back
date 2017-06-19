class Api::V1::EventsController < ApplicationController

  def index
    handle_errors do
      render json: { data: { events: Event.get_events_in_range(events_params.to_h) } }
    end
  end

  def create
    handle_errors do
      event = Event.create!(event_params)
      render json: { data: {event: event} }
    end
  end

  def update
    handle_errors do
      event = Event.update(params[:id], event_params)
      raise ActiveRecord::RecordInvalid, event unless event.valid?
      render json: { data: {event: event} }
    end
  end

  def destroy
    handle_errors do
      Event.find(params[:id]).destroy
      render head: :ok
    end
  end


  def handle_errors
    begin
      yield
    rescue ActiveRecord::RecordNotFound
      render status: 404
    rescue ActiveRecord::RecordInvalid => e
      render json: { data: { errors: e.record.errors.messages } }, status: 422
    rescue TypeError
      render status: 400
    rescue ArgumentError
      render status: 400
    end
  end

  private

  def event_params
    new_params = params.require(:event).permit(:title, :description, :event_start_date, :event_end_date)
    convert_date_params(new_params)
    return new_params
  end

  def events_params
    new_params = params.permit(:event_start_date, :event_end_date)
    convert_date_params(new_params)
    return new_params
  end

  def convert_date_params(new_params)
    new_params[:event_start_date] = DateTime.parse(new_params[:event_start_date])
    new_params[:event_end_date] = DateTime.parse(new_params[:event_end_date])
  end
end
