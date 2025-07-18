import { CommonText, TitleComponent } from "../Texts";
import "../../../Assets/Styles/Components/Header/HeaderComponent.css";
import { CommonButton } from "../Buttons";
import logo from "../../../Assets/Images/Logos.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { LogOut } from "lucide-react";

type Props = {
  Button: Boolean;
  url?: string;
};

const HeaderLoginComponent = ({ Button, url }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth()

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            className="logo-icon"
            src={logo}
            alt="logo-observabilidad"
            onClick={handleLogoClick}
            style={{ cursor: "pointer", width: 60, objectFit: "cover" }}
          />
          <TitleComponent
            text="GRP Observabilidad"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="linkButton">
          <CommonText text="Videos" onClick={() => navigate("/videos")} />
          <CommonText
            text="Agregar información"
            onClick={() => navigate("/add-information")}
          />
          <CommonText
            text="Tabla de datos"
            onClick={() => navigate("/table-information")}
          />
          <CommonText
            text="Dashboards"
            onClick={() => navigate("/dashboards")}
          />
          <CommonText text="Más" onClick={() => navigate("/main")} />
          <CommonText text="Salir " onClick={logout} ><LogOut /></CommonText> 
        </div>
        {Button && (
          <div className="aboutUs">
            <CommonButton title="About Us" url={url} />
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderLoginComponent;
