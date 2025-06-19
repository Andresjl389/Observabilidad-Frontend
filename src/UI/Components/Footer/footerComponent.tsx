import "../../../Assets/Styles/Components/Footer/footerComponent.css";
import logo from "../../../Assets/Images/icon.svg";
import { TextSemiBoldComponent, TitleComponent } from "../Texts";

const FooterCompoent = () => {
  return (
    <>
      <footer className="footerContainer">
        <div className="iconContainer">
          <img src={logo} alt="Logo observabilidad"/>
          <TitleComponent text="GRP Observabilidad" />
        </div>
        <div className="contactSection">
          <div className="contactContainer">
            <TextSemiBoldComponent text="Company" color={true} size={20}  weight="" />
            <ul className="listContainer">
              <li className="liItem">
                <TextSemiBoldComponent text="Address" color={true}  weight=""/>
              </li>
              <li className="liItem">
                <TextSemiBoldComponent text="Phone" color={true}  weight=""/>
              </li>
              <li className="liItem">
                <TextSemiBoldComponent text="Email" color={true}  weight=""/>
              </li>
            </ul>
          </div>
          <div className="contactContainer">
            <TextSemiBoldComponent text="Company" color={true} size={20}  weight=""/>
            <ul className="listContainer">
              <li className="liItem">
                <TextSemiBoldComponent text="Address" color={true}  weight=""/>
              </li>
              <li className="liItem">
                <TextSemiBoldComponent text="Phone" color={true} weight="" />
              </li>
              <li className="liItem">
                <TextSemiBoldComponent text="Email" color={true}  weight=""/>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterCompoent;
