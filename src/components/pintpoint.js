import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./pintpoint.css"
import { useEffect,useState } from "react"
import { getMe } from "../managers/authManager"
import { AdminViews } from "./views/AdminViews"
import { BartenderViews } from "./views/BartenderViews"


export const Pintpoint = () => {

	const [me, setMe] = useState()
	const [doneLoading, setDoneLoading] = useState(false)

	useEffect(()=>{
		setDoneLoading(false)
        setMe(null)
		getMe().then(res => setMe(res))
	},[])

    useEffect(()=>{
        if(me){
            setDoneLoading(true)
        }
    },[me])

	if(me && doneLoading){
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar me={me}/>
					{
						me?.user?.is_staff
						? <AdminViews />
						: <BartenderViews />
					}
				</>
			</Authorized>

		} />
	</Routes>	
	}
}

