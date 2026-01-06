import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiAccounts } from "../api/axiosAccounts";
import { apiAccesscontrol } from "../api/axiosAccesscontrol";

const AssignTeamToUser = () => {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [userId, setUserId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        apiAccounts.get("users/").then(res => setUsers(res.data));
        apiAccounts.get("teams/").then(res => setTeams(res.data));
    }, []);

    const assignTeam = async () => {
        if (!userId || !teamId) return alert("Select user and team");

        try {
            setLoading(true);
            await apiAccesscontrol.post(
                `users/${userId}/team/`,
                { team_id: teamId }
            );
            alert("✅ Team assigned successfully");
            setUserId("");
            setTeamId("");
        } catch {
            alert("❌ Failed to assign team");
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
                            <span className="text-white text-xl">👥</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Assign Team to User
                            </h1>
                            <p className="text-sm text-blue-100">
                                Assign users to teams
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
                        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">

                            <div>
                                <label className="block mb-2 text-gray-700">
                                    Select User
                                </label>
                                <select
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full border px-4 py-2 rounded-md"
                                >
                                    <option value="">Select User</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>
                                            {u.username}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-gray-700">
                                    Select Team
                                </label>
                                <select
                                    value={teamId}
                                    onChange={(e) => setTeamId(e.target.value)}
                                    className="w-full border px-4 py-2 rounded-md"
                                >
                                    <option value="">Select Team</option>
                                    {teams.map(t => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={assignTeam}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {loading ? "Assigning..." : "Assign Team"}
                            </button>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AssignTeamToUser;
