class ChangeOptionsForeignKey < ActiveRecord::Migration[6.1]
  def change
    # Comment
    remove_foreign_key :comments,:users
    add_foreign_key :comments,:users,on_delete: :cascade
    remove_foreign_key :comments,:posts
    add_foreign_key :comments,:posts,on_delete: :cascade
    # Like
    remove_foreign_key :likes,:users
    add_foreign_key :likes,:users,on_delete: :cascade
    remove_foreign_key :likes,:posts
    add_foreign_key :likes,:posts,on_delete: :cascade
    # Playlist
    remove_foreign_key :playlists,:users
    add_foreign_key :playlists,:users,on_delete: :cascade
    # Playlist_list
    remove_foreign_key :playlist_lists,:posts
    add_foreign_key :playlist_lists,:posts,on_delete: :cascade
    remove_foreign_key :playlist_lists,:playlists
    add_foreign_key :playlist_lists,:playlists,on_delete: :cascade
    # Post
    remove_foreign_key :posts,:users
    add_foreign_key :posts,:users,on_delete: :cascade
  end
end
