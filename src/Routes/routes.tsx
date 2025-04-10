import React from "react";
import { Route, BrowserRouter, Routes} from "react-router-dom";
import { AddInformationComponent, Main, TableScreen } from "../UI/Screen";


const AppRoute:React.FC = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/hola" element={<h1>HOLA</h1>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/add-information" element={<AddInformationComponent/>}/>
                <Route path="/table-information" element={<TableScreen/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoute
