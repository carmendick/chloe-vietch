import {

    LayoutDashboard,

    Upload,

    CalendarClock,

    Users,

    BarChart3,

    Settings,

    LogOut

} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

    const { user, logout } = useAuth();

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },

        {
            name: "Upload",
            path: "/upload",
            icon: Upload
        },

        {
            name: "Queue",
            path: "/queue",
            icon: CalendarClock
        },

        {
            name: "Accounts",
            path: "/accounts",
            icon: Users
        },

        {
            name: "Analytics",
            path: "/analytics",
            icon: BarChart3
        },

        {
            name: "Settings",
            path: "/settings",
            icon: Settings
        }

    ];

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo">

                    <h2>CreatorDesk</h2>

                    <small>

                        Creator Studio

                    </small>

                </div>

                <nav>

                    {

                        menu.map(item => {

                            const Icon = item.icon;

                            return (

                                <NavLink

                                    key={item.path}

                                    to={item.path}

                                    className={({ isActive }) =>

                                        isActive

                                            ? "sidebar-link active"

                                            : "sidebar-link"

                                    }

                                >

                                    <Icon size={20} />

                                    <span>

                                        {item.name}

                                    </span>

                                </NavLink>

                            );

                        })

                    }

                </nav>

            </div>

            <div className="sidebar-footer">

                <div className="sidebar-user">

                    <strong>

                        {user?.email}

                    </strong>

                </div>

                <button

                    className="btn"

                    onClick={logout}

                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

}