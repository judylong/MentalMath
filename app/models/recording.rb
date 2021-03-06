class Recording < ActiveRecord::Base
  validates :level, :duration_ms, :user_id, presence: true
  validates_inclusion_of :correct, :in => [true, false]
  belongs_to :user

  scope :leveln, -> (level, bool) {where(level: level, correct: bool)}

end
