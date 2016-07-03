module Api
  class RecordingsController < ApiController
    def create
      @recording = current_user.recordings.new(recordings_params)
      if @recording.save
        render json: @recording
      else
        render json: @recording.errors.full_messages, status: 402
      end
    end

    private
    def recordings_params
      params.require(:recording).permit(:level, :correct, :duration_ms)
    end
  end
end
