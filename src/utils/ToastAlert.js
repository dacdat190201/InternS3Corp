import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ShowAlert = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
export const ShowError = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
