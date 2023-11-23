import React from 'react';
import DotLoader from 'react-spinners/DotLoader';
const LoadingComponent = ({ loading }) => {
    return (
        <div
            style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <DotLoader loading={loading} size={30} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
};

export default LoadingComponent;
