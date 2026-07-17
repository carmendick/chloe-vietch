export default function Button({

children,

onClick,

type="button",

disabled=false

}){

return(

<button

type={type}

className="btn"

disabled={disabled}

onClick={onClick}

>

{children}

</button>

);

}