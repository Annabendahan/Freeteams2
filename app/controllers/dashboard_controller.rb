class DashboardController < ApiController

  def my_teams
    teams_created = Team.where(user: current_user).order(created_at: :desc)
    render json: teams_created




  end


  def my_requests
    requests = Request.where(user: current_user)
    render json: requests
  end

end
