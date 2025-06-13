import "./App.css";
import AppRoute from "./Routes/routes";
import "./Assets/Styles/Normalize/normalize.css";
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <AppRoute />
      <ToastContainer />
    </>
  );
}

export default App;
