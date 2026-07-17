export default function Avatar({

    email

}){

    return(

        <div

            style={{

                width:48,

                height:48,

                borderRadius:"50%",

                background:"#2563eb",

                color:"#fff",

                display:"flex",

                alignItems:"center",

                justifyContent:"center",

                fontWeight:"700",

                fontSize:"18px"

            }}

        >

            {

                email

                ?

                email.charAt(0).toUpperCase()

                :

                "U"

            }

        </div>

    );

}