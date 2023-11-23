import { Outlet } from 'react-router-dom';
import Footer from '../component/UI/footer/Footer';
import Header from '../component/UI/header/Header';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container-md margin__container" style={{ maxWidth: '1170px' }}>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    );
}

export default App;
