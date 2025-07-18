import "../../../Assets/Styles/Components/Footer/footerComponent.css";
import { TextSemiBoldComponent, TitleComponent } from "../Texts";

const FooterCompoent = () => {
  return (
    <>
      <footer className="footerContainer">
        <div className="iconContainer">
          <TitleComponent text="GRP Observabilidad" />
        </div>
        <div className="contactSection">
          <div className="contactContainer">
            <TextSemiBoldComponent
              text="Soporte Técnico"
              color={true}
              size={20}
              weight=""
            />
            <ul className="listContainer">
              <li className="liItem">
                <TextSemiBoldComponent
                  text="¿Problemas con métricas o dashboards?"
                  color={true}
                  weight=""
                />
              </li>
              <li className="liItem">
                <button
                  onClick={() =>
                    window.open(
                      "https://mail.google.com/mail/?view=cm&to=grpobservabilidadyanaliticati@davivienda.com",
                      "_blank"
                    )
                  }
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <TextSemiBoldComponent
                    text="Escríbenos en grpobservabilidadyanaliticati@davivienda.com"
                    color={true}
                    weight=""
                  />
                </button>
              </li>
              <li className="liItem">
                <TextSemiBoldComponent
                  text="Respuesta en 24-48 horas"
                  color={true}
                  weight=""
                />
              </li>
            </ul>
          </div>
          <div className="contactContainer">
            <TextSemiBoldComponent
              text="Recursos Rápidos"
              color={true}
              size={20}
              weight=""
            />
            <ul className="listContainer">
              <li className="liItem">
                <TextSemiBoldComponent
                  text="Métricas en Tiempo Real"
                  color={true}
                  weight=""
                />
              </li>
              <li className="liItem">
                <TextSemiBoldComponent
                  text="Análisis de Logs"
                  color={true}
                  weight=""
                />
              </li>
              <li className="liItem">
                <TextSemiBoldComponent
                  text="Estado de Servicios"
                  color={true}
                  weight=""
                />
              </li>
              <li className="liItem">
                <TextSemiBoldComponent
                  text="Reportes Automáticos"
                  color={true}
                  weight=""
                />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterCompoent;
