class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.references :team, foreign_key: true
      t.references :user, foreign_key: true
      t.text :text
      t.string :status
      t.string :answer

      t.timestamps
    end
  end
end
