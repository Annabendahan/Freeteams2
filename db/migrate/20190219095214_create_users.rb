class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password_digest
      t.string :location
      t.string :description
      t.string :age
      t.string :websitelink

      t.timestamps
    end
  end
end
