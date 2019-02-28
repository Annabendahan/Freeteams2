class ChangeCapacityToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :teams, :capacity, :integer
  end
end
