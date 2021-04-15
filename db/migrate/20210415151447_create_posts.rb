class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.string :selectedImgFile
      t.string :selectedVidFile
      t.string :selectedAudFile

      t.timestamps
    end
  end
end
