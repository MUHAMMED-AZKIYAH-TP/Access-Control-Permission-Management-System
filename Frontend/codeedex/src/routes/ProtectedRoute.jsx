import { Navigate, Outlet } from 'react-router-dom';

export const Protected_router = () => {
    const token = localStorage.getItem("access");
    if (!token) {    
        return (<Navigate to="/login" replace />);
    }
    return (
        <Outlet />
    )
}

export default Protected_router;
