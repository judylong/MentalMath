json.extract! user, :email, :id

json.levels do
  json.level0 do
    json.correct user.recordings.leveln(0, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(0, false).pluck(:duration_ms)
  end

  json.level1 do
    json.correct user.recordings.leveln(1, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(1, false).pluck(:duration_ms)
  end

  json.level2 do
    json.correct user.recordings.leveln(2, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(2, false).pluck(:duration_ms)
  end

  json.level3 do
    json.correct user.recordings.leveln(3, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(3, false).pluck(:duration_ms)
  end

  json.level4 do
    json.correct user.recordings.leveln(4, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(4, false).pluck(:duration_ms)
  end

  json.level5 do
    json.correct user.recordings.leveln(5, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(5, false).pluck(:duration_ms)
  end

  json.level6 do
    json.correct user.recordings.leveln(6, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(6, false).pluck(:duration_ms)
  end

  json.level7 do
    json.correct user.recordings.leveln(7, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(7, false).pluck(:duration_ms)
  end

  json.level8 do
    json.correct user.recordings.leveln(8, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(8, false).pluck(:duration_ms)
  end

  json.level9 do
    json.correct user.recordings.leveln(9, true).pluck(:duration_ms)
    json.wrong user.recordings.leveln(9, false).pluck(:duration_ms)
  end
end

json.correctCount user.recordings.where(correct: true).group(:level).count
json.wrongCount user.recordings.where(correct: false).group(:level).count
