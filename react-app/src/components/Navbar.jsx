import {

    Bell,

    Search,

    Moon

} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user } = useAuth();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 18) {

        greeting = "Good Afternoon";

    }

    const today = new Date().toLocaleDateString(

        undefined,

        {

            weekday: "long",

            month: "long",

            day: "numeric"

        }

    );

    return (

        <header className="navbar">

            <div>

                <h2>

                    {greeting},

                    {" "}

                    {user?.email?.split("@")[0]}

                    👋

                </h2>

                <small>

                    {today}

                </small>

            </div>

            <div className="navbar-actions">

                <div className="search-box">

                    <Search size={18}/>

                    <input

                        placeholder="Search..."

                    />

                </div>

                <button className="icon-btn">

                    <Bell size={20}/>

                </button>

                <button className="icon-btn">

                    <Moon size={20}/>

                </button>

            </div>

        </header>

    );

}