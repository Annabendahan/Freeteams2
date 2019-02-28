class RequestsController < ApiController

  def index
    team = Team.find(params[:team_id])
  requests = Request.where(team_id: team.id)
  render json: requests
  end

  def create
    @request = Request.create(request_params)
    render json: @request

  end


 def update

    request = Request.find(params[:id])
    @request.update_attributes(request_params)
    render :json
   end


private

  def request_params
    params.require(:request).permit(:user, :team, :user_id, :team_id, :text, :answer, :status, :id)
  end
end
