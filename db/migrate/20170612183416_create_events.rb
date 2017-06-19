class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.datetime :event_start_date
      t.datetime :event_end_date
      t.timestamps
    end
  end
end
