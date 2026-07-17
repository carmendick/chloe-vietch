import Card from "./Card";

export default function StatCard({

    title,

    value,

    color

}) {

    return (

        <Card>

            <div
                style={{
                    borderLeft: `6px solid ${color}`,
                    paddingLeft: "18px"
                }}
            >

                <p
                    style={{
                        color: "#6b7280",
                        marginBottom: "8px"
                    }}
                >

                    {title}

                </p>

                <h2
                    style={{
                        margin: 0,
                        fontSize: "34px"
                    }}
                >

                    {value}

                </h2>

            </div>

        </Card>

    );

}