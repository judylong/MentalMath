class CreateRecordings < ActiveRecord::Migration
  def change
    create_table :recordings do |t|
      t.integer :user_id, null: false
      t.boolean :correct, null: false
      t.integer :level, null: false
      t.integer :duration_sec, null: false

      t.timestamps null: false
    end
  end
end
