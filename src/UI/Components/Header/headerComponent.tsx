import { CommonText, TitleComponent } from "../Texts";
import "../../../Assets/Styles/Components/Header/HeaderComponent.css";
import { CommonButton } from "../Buttons";
import logo from '../../../Assets/Images/icon.svg'

const HeaderComponent = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img className="logo-icon" src={logo} />
          <TitleComponent text="GRP Observabilidad" />
        </div>

        <div className="linkButton">
          <CommonText text="Stack" />
          <CommonText text="Stack info" />
          <CommonText text="Relevant" />
          <CommonText text="Some links" />
        </div>
        <div className="aboutUs">
            <CommonButton title="About Us"/>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;
