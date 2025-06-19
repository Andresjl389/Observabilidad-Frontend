import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  AddInformationComponent,
  Dashboard,
  Home,
  LoginPage,
  TableScreen,
  UserDepurationSection,
  VideosSection,
} from "../UI/Screen";

import PrivateRoute from "./PrivateRoute";
import { Main } from "../UI/Screen/Main";
import { AuthProvider, useAuth } from "../Context/Auth/AuthContext";

// Componente para el loader durante la carga
const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner"></div>
    <p>Cargando página...</p>
  </div>
);

// Componente para manejar las rutas públicas con redirección basada en autenticación
const PublicRouteWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Grupo de rutas públicas que redirigen a /main si está autenticado */}
          <Route element={<PublicRouteWrapper />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Home />} />
          </Route>

          {/* Rutas privadas que requieren autenticación */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboards" element={<Dashboard />} />
            <Route path="/main" element={<Main />} />
            <Route path="/table-information" element={<TableScreen />} />
            <Route path="/depuration" element={<UserDepurationSection />} />
            <Route
              path="/add-information"
              element={<AddInformationComponent />}
            />
            <Route path="/videos" element={<VideosSection />} />
          </Route>

          {/* Ruta para cualquier otra dirección no definida */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const AppRoute: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default AppRoute;
