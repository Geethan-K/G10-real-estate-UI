import {createContext , useContext , useState} from 'react';
import Alert from '../../components/alert/Alert';

const AlertContext = createContext();

export function AlertProvider ({children}) {

    const [alert , setAlert] = useState(null);

    const showAlert = (type , message) => {
        setAlert({type,message});
        setTimeout(()=> setAlert(null),5000)
    }
    return (
        <AlertContext.Provider value={{showAlert}}>
            {children}
            {
                alert && (
                    <div className="fixed top-6 right-6 z-50">
                        <Alert type={alert.type} message={alert.message} />
                    </div>
                )
            }
        </AlertContext.Provider>
    )
}

export function useAlert() {
  return useContext(AlertContext);
}
