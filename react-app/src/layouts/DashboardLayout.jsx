import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "var(--background)"
            }}
        >

            <Sidebar />

            <main
                style={{
                    flex: 1,
                    padding: "32px",
                    overflowY: "auto"
                }}
            >

                <Navbar />

                {children}

            </main>

        </div>

    );

}