import Card from "./Card";

export default function RecentActivity({

    posts=[]

}){

    return(

        <Card>

            <h2>

                Recent Uploads

            </h2>

            {

                posts.length===0

                ?

                <p>

                    No uploads yet.

                </p>

                :

                posts.map(post=>(

                    <div

                        key={post.id}

                        style={{

                            padding:"15px 0",

                            borderBottom:"1px solid #eee"

                        }}

                    >

                        <strong>

                            {post.caption}

                        </strong>

                        <br/>

                        <small>

                            {post.status}

                        </small>

                    </div>

                ))

            }

        </Card>

    );

}