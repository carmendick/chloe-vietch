import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";

import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../services/dashboard";

export default function Dashboard() {

    const { user, token } = useAuth();

    const [stats, setStats] = useState({

        accounts: 0,

        drafts: 0,

        scheduled: 0,

        published: 0

    });

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboardStats(token);

                setStats(data);

            }

            catch (err) {

                console.error(err);

            }

        }

        if (token) {

            loadDashboard();

        }

    }, [token]);

    return (

        <DashboardLayout>

            <h1>

                Welcome back,

            </h1>

            <p
                style={{
                    marginBottom: "30px"
                }}
            >

                {user?.email}

            </p>

            <div className="stats-grid">

                <StatCard

                    title="Connected Accounts"

                    value={stats.accounts}

                    color="#3B82F6"

                />

                <StatCard

                    title="Draft Posts"

                    value={stats.drafts}

                    color="#22C55E"

                />

                <StatCard

                    title="Scheduled"

                    value={stats.scheduled}

                    color="#F97316"

                />

                <StatCard

                    title="Published"

                    value={stats.published}

                    color="#9333EA"

                />

            </div>

            <RecentActivity />

        </DashboardLayout>

    );

}