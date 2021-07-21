class CreateTemperatures < ActiveRecord::Migration[6.0]
  def change
    create_table :temperatures do |t|
      t.decimal :value, precision: 5, scale: 2
      t.references :city, null: false, foreign_key: true

      t.timestamps
    end
  end
end
