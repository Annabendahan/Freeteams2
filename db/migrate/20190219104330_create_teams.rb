class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :title
      t.text :description
      t.string :location
      t.integer :capacity
      t.string :category
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
