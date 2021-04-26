class RemovePrimaryKeyFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :primary_key, :string
  end
end
