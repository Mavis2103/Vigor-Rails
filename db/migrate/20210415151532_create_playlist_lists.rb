class CreatePlaylistLists < ActiveRecord::Migration[6.1]
  def change
    create_table :playlist_lists do |t|
      t.references :playlist, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
