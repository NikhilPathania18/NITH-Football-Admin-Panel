import { API } from ".";

export const createTeam = async(teamData) => await API.post('/team/create-team',teamData)

export const getTeamsList = async() => await API.get('/team/list/all');

export const deleteTeam = async(id) => await API.delete(`/team/delete/${id}`)

export const getTeamDetails = async(id) => await API.get(`/team/${id}`)

export const updateTeamDetails = async(id,teamData) => await API.put(`/team/update/${id}`,teamData)