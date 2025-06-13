import "../../../Assets/Styles/Components/Dashboards/dashboardComponent.css";
import { PieDashboardComponent } from "./PieDashboard";
import NumberDashboardComponent from "./NumberDashboard/numberDashboardComponent";
import { useEffect, useState } from "react";
import {
  GetApdex,
  GetDisponibilidad,
  GetSessions,
  GetTimes,
  GetVersions,
} from "../../../service";
import { Skeleton } from "@mui/material";
import ChartOrder from "./GraficDashboard/graficDashboard";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { DataSessions } from "../../../interfaces/DataSessions";
import { Apdex } from "../../../interfaces/Apdex";
import { DynamicPieChart } from "./DynatmicPie";
import { Times } from "../../../interfaces/Times";
import { Dispo } from "../../../interfaces/Disponbilidad";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DateRange {
  startDate: string | undefined;
  endDate: string | undefined;
}

const DashboardComponent = ({ startDate, endDate }: DateRange) => {
  const [sessions, setSessions] = useState<DataSessions>();
  const [apdex, setApdex] = useState<Apdex>();
  const [times, setTimes] = useState<Times>();
  const [version, setVersion] = useState<Record<string, number> | null>(null);
  const [disponibilidadSuperApp, setDisponibilidadSuperApp] = useState<Dispo[]>([]);
  const [disponibilidadDaviCom, setDisponibilidadDaviCom] = useState<Dispo[]>([]);

  const [selectedYearSuperApp, setSelectedYearSuperApp] = useState<number>(new Date().getFullYear());
  const [selectedYearDaviCom, setSelectedYearDaviCom] = useState<number>(new Date().getFullYear());

  const [loadingSuperApp, setLoadingSuperApp] = useState<boolean>(true);
  const [loadingDaviCom, setLoadingDaviCom] = useState<boolean>(true);

  const { token } = useAuth();

  const handleError = (error: any, context: string) => {
    console.error(`Error en ${context}:`, error);
    const message = error?.response?.data?.detail || error?.message || "Error desconocido";
    if (message.toLowerCase().includes("token")) {
      toast.error("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
    } else {
      toast.error(`Ocurrió un error al obtener ${context.toLowerCase()}: ${message}`);
    }
  };

  useEffect(() => {
    handleSessions();
    handleApdex();
    handleVersion();
    handleTimes();
    handleDisponibilidadSuperApp();
    handleDisponibilidadDaviCom();
  }, []);

  useEffect(() => {
    if (selectedYearSuperApp) {
      handleDisponibilidadSuperApp();
    }
  }, [selectedYearSuperApp]);

  useEffect(() => {
    if (selectedYearDaviCom) {
      handleDisponibilidadDaviCom();
    }
  }, [selectedYearDaviCom]);

  useEffect(() => {
    if (startDate || endDate) {
      handleApdex();
      handleTimes();
      handleSessions();
      handleVersion();
    }
  }, [startDate, endDate]);

  const handleSessions = async () => {
    try {
      const response = await GetSessions(token, startDate, endDate);
      setSessions(response);
    } catch (error) {
      handleError(error, "sesiones");
    }
  };

  const handleApdex = async () => {
    try {
      const response = await GetApdex(token, startDate, endDate);
      setApdex(response);
    } catch (error) {
      handleError(error, "apdex");
    }
  };

  const handleVersion = async () => {
    try {
      const response = await GetVersions(token, startDate, endDate);
      setVersion(response);
    } catch (error) {
      handleError(error, "versiones");
    }
  };

  const handleTimes = async () => {
    try {
      const response = await GetTimes(token, startDate, endDate);
      setTimes(response);
    } catch (error) {
      handleError(error, "tiempos de login");
    }
  };

  const validateResponse = (response: any): boolean => {
    if (!response) return false;
    if (response.data?.actor?.account?.nrql?.results) {
      return response.data.actor.account.nrql.results.length > 0;
    }
    if (Array.isArray(response)) {
      return response.length > 0;
    }
    return Object.keys(response).length > 0;
  };

  const handleDisponibilidadSuperApp = async () => {
    try {
      setLoadingSuperApp(true);
      const responseSuperApp = await GetDisponibilidad(token, false, selectedYearSuperApp);
      if (validateResponse(responseSuperApp)) {
        setDisponibilidadSuperApp(responseSuperApp);
      } else {
        toast.info(`No hay datos disponibles para SuperApp en el año ${selectedYearSuperApp}`);
        setDisponibilidadSuperApp([]);
      }
    } catch (error) {
      handleError(error, "disponibilidad de SuperApp");
      setDisponibilidadSuperApp([]);
    } finally {
      setLoadingSuperApp(false);
    }
  };

  const handleDisponibilidadDaviCom = async () => {
    try {
      setLoadingDaviCom(true);
      const responseDaviCom = await GetDisponibilidad(token, true, selectedYearDaviCom);
      if (validateResponse(responseDaviCom)) {
        setDisponibilidadDaviCom(responseDaviCom);
      } else {
        toast.info(`No hay datos disponibles para DaviCom en el año ${selectedYearDaviCom}`);
        setDisponibilidadDaviCom([]);
      }
    } catch (error) {
      handleError(error, "disponibilidad de DaviCom");
      setDisponibilidadDaviCom([]);
    } finally {
      setLoadingDaviCom(false);
    }
  };

  const handleYearChangeSuperApp = (year: number) => {
    setSelectedYearSuperApp(year);
  };

  const handleYearChangeDaviCom = (year: number) => {
    setSelectedYearDaviCom(year);
  };

  const pieChartData = version
    ? Object.keys(version).map((key) => ({
        name: key,
        value: version[key],
      }))
    : [];

  return (
    <div className="dashboard">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="revenue-cards">
        {sessions ? (
          <>
            <NumberDashboardComponent amount={sessions.total_sessions} label="Total Sesiones" />
            <NumberDashboardComponent amount={sessions.unique_sessions} label="Sesiones Únicas" />
            <NumberDashboardComponent amount={sessions.average_sessions_per_user} label="Promedio Sesiones" />
          </>
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}

        {times ? (
          <>
            <NumberDashboardComponent amount={times.total_ios} suffix="seg" label="Tiempo login iOS" />
            <NumberDashboardComponent amount={times.total_android} suffix="seg" label="Tiempo login Android" />
          </>
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
      </div>

      <div className="pie-chart-section">
        <div className="charts-container">
          {apdex ? (
            <>
              <PieDashboardComponent label={"Apdex Web"} percentage={apdex.web} />
              <PieDashboardComponent label={"Apdex Mobile"} percentage={apdex.mobile} />
            </>
          ) : (
            <>
              <Skeleton animation="wave" style={{ height: "250px", width: "150px", borderRadius: "50%" }} />
              <Skeleton animation="wave" style={{ height: "250px", width: "150px", borderRadius: "50%" }} />
            </>
          )}
          <DynamicPieChart data={pieChartData} />
        </div>
      </div>

      {loadingSuperApp ? (
        <Skeleton variant="rectangular" width="60%" height={400} style={{ margin: '20px 0' }} />
      ) : (
        <ChartOrder 
          disponibilidad={disponibilidadSuperApp} 
          selectedYear={selectedYearSuperApp}
          onYearChange={handleYearChangeSuperApp}
          title="Disponibilidad SuperApp"
        />
      )}

      {loadingDaviCom ? (
        <Skeleton variant="rectangular" width="60%" height={400} style={{ margin: '20px 0' }} />
      ) : (
        <ChartOrder 
          disponibilidad={disponibilidadDaviCom} 
          selectedYear={selectedYearDaviCom}
          onYearChange={handleYearChangeDaviCom}
          title="Disponibilidad DaviCom"
        />
      )}
    </div>
  );
};

export default DashboardComponent;
