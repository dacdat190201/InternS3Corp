import { Outlet } from 'react-router-dom';
import Footer from '../component/UI/footer/Footer';
import Header from '../component/UI/header/Header';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
