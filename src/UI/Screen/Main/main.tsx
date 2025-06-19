import React from "react";
import "../../../Assets/Styles/UI/Main/main.css";
import {
  CardMainComponent,
  FooterCompoent,
  HeaderLoginComponent,
} from "../../Components";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const Main: React.FC = () => {

  return (
    <>
      <HeaderLoginComponent Button={false} />
      {/* Usamos el wrapper para el icono */}
      <div className="main-container">
        <div className="cards-grid">
          <CardMainComponent
            id={1}
            title="Agregar Información"
            description="Añade nuevos datos y registros al sistema"
            path="/add-information"
            icon={<AddBoxIcon />}
          />
          <CardMainComponent
            id={2}
            title="Dashboards"
            description="Visualiza y monitorea el estado de tus sistemas en tiempo real"
            path="/dashboards"
            icon={<SpaceDashboardIcon />}
          />
          <CardMainComponent
            id={3}
            title="Tabla de Datos"
            description="Consulta y gestiona todos los registros en el sistema"
            path="/table-information"
            icon={<OndemandVideoIcon />}
          />
          <CardMainComponent
            id={4}
            title="Videos"
            description="Capacítate en herramientas y prácticas clave de observabilidad para mejorar el monitoreo, la detección de incidentes y la respuesta operativa."
            path="/videos"
            icon={<TableChartIcon />}
          />
          <CardMainComponent
            id={4}
            title="Depuración de usuarios"
            description="Elimina los usuarios de dynatrace que llevan mas de 3 meses sin ingresar en la herramienta."
            path="/depuration"
            icon={<PersonRemoveIcon />}
          />
        </div>
      </div>
      <FooterCompoent />
    </>
  );
};

export default Main;