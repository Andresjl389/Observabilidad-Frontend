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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HttpsIcon from '@mui/icons-material/Https';
import { useUserRole } from "../../../hooks/useUserRole";

interface CardConfig {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const Main: React.FC = () => {
  const { loading, userInfo } = useUserRole();

  // Configuración de las tarjetas con los roles permitidos
  const cardsConfig: CardConfig[] = [
    {
      id: 1,
      title: "Dashboards",
      description: "Visualiza y monitorea el estado de tus sistemas en tiempo real",
      path: "/dashboards",
      icon: <SpaceDashboardIcon />,
      roles: ["administrador", "usuario"]
    },
    {
      id: 2,
      title: "Videos",
      description: "Capacítate en herramientas y prácticas clave de observabilidad para mejorar el monitoreo, la detección de incidentes y la respuesta operativa.",
      path: "/videos",
      icon: <OndemandVideoIcon />,
      roles: ["administrador", "usuario"]
    },
    {
      id: 3,
      title: "Agregar Información",
      description: "Añade nuevos datos y registros al sistema",
      path: "/add-information",
      icon: <AddBoxIcon />,
      roles: ["administrador"]
    },
    {
      id: 4,
      title: "Tabla de Datos",
      description: "Consulta y gestiona todos los registros en el sistema",
      path: "/table-information",
      icon: <TableChartIcon />,
      roles: ["administrador"]
    },
    {
      id: 5,
      title: "Depuración de usuarios",
      description: "Elimina los usuarios de dynatrace que llevan mas de 3 meses sin ingresar en la herramienta.",
      path: "/depuration",
      icon: <PersonRemoveIcon />,
      roles: ["administrador"]
    },
    {
      id: 6,
      title: "Administrar usuarios",
      description: "Actualiza, elimina o mira los usuarios registrados en la aplicación.",
      path: "/manage-users",
      icon: <PeopleAltIcon />,
      roles: ["administrador"]
    },
    {
      id: 7,
      title: "Administrar tokens",
      description: "Gestiona los tokens necesarios para el funcionamiento de la aplicación.",
      path: "/manage-token",
      icon: <HttpsIcon />,
      roles: ["administrador"]
    }
  ];

  // Filtrar las tarjetas según el rol del usuario
  const getVisibleCards = () => {
    if (!userInfo?.role?.name) return [];
    
    const userRole = userInfo.role.name.toLowerCase();
    return cardsConfig.filter(card => 
      card.roles.includes(userRole)
    );
  };

  const visibleCards = getVisibleCards();

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner"></div>
        <p>Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <>
      <HeaderLoginComponent Button={false} />
      <div className="main-container">
       
        
        <div className="cards-grid">
          {visibleCards.length > 0 ? (
            visibleCards.map((card) => (
              <CardMainComponent
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                path={card.path}
                icon={card.icon}
              />
            ))
          ) : (
            <div className="no-access-message">
              <p>No tienes acceso a ninguna funcionalidad en este momento.</p>
              <p>Contacta al administrador si crees que esto es un error.</p>
            </div>
          )}
        </div>
      </div>
      <FooterCompoent />
    </>
  );
};

export default Main;