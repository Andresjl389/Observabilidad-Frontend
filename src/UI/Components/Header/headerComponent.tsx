import { CommonText, TitleComponent } from "../Texts";
import "../../../Assets/Styles/Components/Header/HeaderComponent.css";
import { CommonButton } from "../Buttons";
import logo from "../../../Assets/Images/icon.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  Button: Boolean;
  url?: string;
  onNavigateToSection?: (sectionId: string) => void;
};

const HeaderComponent = ({ Button, url, onNavigateToSection }: Props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo" >
          <img className="logo-icon" src={logo} alt="logo-observabilidad" onClick={handleLogoClick} style={{cursor: 'pointer'}} />
          <TitleComponent text="GRP Observabilidad" onClick={handleLogoClick} style={{cursor: 'pointer'}}/>
        </div>

        <div className="linkButton">
          <CommonText text="Herramientas" onClick={() => onNavigateToSection?.("stack")} />
          <CommonText text="Información relevante" onClick={() => onNavigateToSection?.("info")} />
          <CommonText text="Visitar páginas" onClick={() => onNavigateToSection?.("pages")}/>
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

export default HeaderComponent;
