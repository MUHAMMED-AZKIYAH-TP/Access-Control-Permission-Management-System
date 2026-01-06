import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccounts } from "../api/axiosAccounts";

const Teams = () => {
    const [name, setName] = useState("");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [editName, setEditName] = useState("");

    const fetchTeams = async () => {
        try {
            const res = await apiAccounts.get("teams/");
            setTeams(res.data);
        } catch {
            alert("Failed to load teams");
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const createTeam = async () => {
        if (!name.trim()) return alert("Please enter team name");
        try {
            setLoading(true);
            await apiAccounts.post("teams/", { name });
            setName("");
            fetchTeams();
        } finally {
            setLoading(false);
        }
    };

    const deleteTeam = async (teamId) => {
        if (!confirm("Are you sure you want to delete this team?")) return;
        try {
            await apiAccounts.delete(`teams/${teamId}/`);
            alert("Team deleted successfully");
            fetchTeams();
        } catch (error) {
            alert("Failed to delete team");
        }
    };

    const startEdit = (team) => {
        setEditingTeam(team.id);
        setEditName(team.name);
    };

    const cancelEdit = () => {
        setEditingTeam(null);
        setEditName("");
    };

    const updateTeam = async () => {
        if (!editName.trim()) {
            alert("Team name is required");
            return;
        }
        try {
            setLoading(true);
            await apiAccounts.put(`teams/${editingTeam}/`, { name: editName });
            alert("Team updated successfully");
            cancelEdit();
            fetchTeams();
        } catch (error) {
            alert("Failed to update team");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* DASHBOARD WRAPPER */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ml-64">

                {/* HEADER */}
                <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-6 flex justify-between items-center shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl font-bold">👥</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Team Management</h1>
                            <p className="text-sm text-blue-100">
                                Organize users into teams
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Admin User</p>
                            <p className="text-xs text-blue-100">Administrator</p>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="p-8">
                    <div className="max-w-4xl mx-auto">

                        {/* CREATE TEAM */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Create New Team
                            </h3>

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter team name"
                                className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                onClick={createTeam}
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {loading ? "Creating..." : "Create Team"}
                            </button>
                        </div>

                        {/* TEAM LIST */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">
                                Existing Teams
                            </h3>

                            {teams.length === 0 ? (
                                <p className="text-gray-500">No teams created yet</p>
                            ) : (
                                <table className="w-full border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-2 ">ID</th>
                                            <th className="p-2 ">Name</th>
                                            <th className="p-2 ">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams.map((team) => (
                                            <tr key={team.id} className="border-t hover:bg-gray-50">
                                                <td className="p-2">{team.id}</td>
                                                <td className="p-2">
                                                    {editingTeam === team.id ? (
                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    ) : (
                                                        <span className="font-medium">{team.name}</span>
                                                    )}
                                                </td>
                                                <td className="p-2">
                                                    {editingTeam === team.id ? (
                                                        <div className="flex space-x-2 justify-center">
                                                            <button
                                                                onClick={updateTeam}
                                                                disabled={loading}
                                                                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:bg-green-400"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex space-x-2 justify-center">
                                                            <button
                                                                onClick={() => startEdit(team)}
                                                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => deleteTeam(team.id)}
                                                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default Teams;
