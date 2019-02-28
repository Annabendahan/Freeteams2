class TeamsController < ApiController
  before_action :authenticate_user

 def index
      @teams = Team.order("created_at DESC")
      render json: @teams
 end


 def show
    team = Team.find(params[:id])
    render json: { team: team }
  end

 def create
    @team = Team.create(team_params)
    render json: @team
   end




   def update
    @team = Team.find(params[:id])
    @team.update_attributes(team_params)
    render :json
   end



   def destroy
  @team = Team.find(params[:id])
    if @team.destroy
      head :no_content, status: :ok
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end


  private

  def team_params
    params.require(:team).permit(:id, :title, :description, :capacity, :location, :category, :user_id)
  end


end
