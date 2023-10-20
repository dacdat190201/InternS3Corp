import React, { Suspense, useContext, useEffect } from 'react';
import './MainProfile.css';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../services/auth/context/AuthContext';
const MainPro = React.lazy(() => import('./MainPro'));
const MainProfile = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    useEffect(() => {
        if (!token.token) {
            alert('404');
            navigate('/home');
        }
    }, [token.token, navigate]);
    return (
        <>
            <Suspense fallback={<CircularProgress />}>
                <MainPro />
            </Suspense>
        </>
    );
};

export default MainProfile;
