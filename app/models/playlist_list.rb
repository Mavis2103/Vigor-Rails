class PlaylistList < ApplicationRecord
  belongs_to :playlist
  belongs_to :post
end
