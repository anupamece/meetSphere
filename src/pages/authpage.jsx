import { useState } from "react"


const authPage = () => {

    const [auth,setAuth]=useState("Login");
  return (
    <>
        <AuthForm defaultMode={auth} onSubmit={(data) => console.log(data)} />
    </>
    
  )
}

export default authPage;