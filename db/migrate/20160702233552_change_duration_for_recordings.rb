class ChangeDurationForRecordings < ActiveRecord::Migration
  def change
    remove_column :recordings, :duration_sec
    add_column :recordings, :duration_ms, :decimal
  end
end
