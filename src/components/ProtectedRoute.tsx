import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../custom hook/useUser"

const ProtectedRoutes = () => {
    const { userState } = useUser()
    if (!userState.isAuthed) {
        return <Navigate to="/login" replace />;
    }
    return <><Outlet /></>;

}

export default ProtectedRoutes