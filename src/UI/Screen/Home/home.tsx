import {
  CardImageComponent,
  CardSmallComponent,
  CommonButton,
  CommonText,
  FooterCompoent,
  HeaderComponent,
  InfoComponent,
  SectionComponent,
  TextSemiBoldComponent,
  TitleSectionComponent,
} from "../../Components";
import "../../../Assets/Styles/UI/Home/main.css";
import firstImg from "../../../Assets/Images/first.svg";
import { GetInfo, GetTypes } from "../../../service";
import { Info } from "../../../interfaces/info";
import { useCallback, useEffect, useState } from "react";
import { Types } from "../../../interfaces/types";
import { IconContainerComponent } from "../../Components/ImagesContainer/IconComponent/IconsC";

const Home = () => {
  const [cardImageInfo, setcardImageInfo] = useState<Info[]>([]);
  const [info, setInfo] = useState<Info[]>([]);
  const [cardInfo, setCardInfo] = useState<Info[]>([]);
  const [stack, setstack] = useState<Info[]>([]);
  const [types, setTypes] = useState<Types[]>([]);

  const getId = useCallback(
    (name: string) => {
      let id: string = "";
      types.forEach((type) => {
        if (type.name === name) {
          id = type.id;
        }
      });
      return id;
    },
    [types]
  );

  const handleCardImageInfo = useCallback(async () => {
    const id = getId("Tarjeta con imagen");
    const data = await GetInfo(id);
    setcardImageInfo(data);
  }, [getId]);

  const handleInfo = useCallback(async () => {
    const id = getId("Información relevante");
    const data = await GetInfo(id);
    setInfo(data);
  }, [getId]);

  const handleCardInfo = useCallback(async () => {
    const id = getId("Información herramientas observabilidad");
    const data = await GetInfo(id);
    setCardInfo(data);
  }, [getId]);

  const handleStack = useCallback(async () => {
    const id = getId("Herramientas observabilidad");
    const data = await GetInfo(id);
    setstack(data);
  }, [getId]);

  const handleInfoType = useCallback(async () => {
    const data = await GetTypes();
    setTypes(data);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleInfoType();
  }, [handleInfoType]);

  useEffect(() => {
    if (types?.length > 0) {
      handleInfo();
      handleCardImageInfo();
      handleCardInfo();
      handleStack();
    }
  }, [types, handleInfo, handleCardImageInfo, handleCardInfo, handleStack]);

  return (
    <>
      <SectionComponent>
        <HeaderComponent
          Button={true}
          url="/login"
          onNavigateToSection={handleScrollToSection}
        />
        <section className="introductorySection">
          <div className="introductionSection--moreInfo">
            <TitleSectionComponent
              blackText="Observabilidad y"
              redText="Analítica TI"
            />
            <CommonButton title="About Us" url="/login" />
          </div>
          <img src={firstImg} alt="first" />
        </section>
      </SectionComponent>
      {stack?.length > 0 && (
        <>
          <section className="platformSection" id="stack">
            <TextSemiBoldComponent
              text="Plataformas de observabilidad"
              size={25}
              weight="600"
            />
            <CommonText text="Trabajamos con varias plataformas para tener monitoreados todos los servicios" />
          </section>

          <div className="PlatformStack">
            {stack?.map((item) => (
              <IconContainerComponent key={item.id} src={item.filepath} />
            ))}
          </div>
        </>
      )}

      {cardInfo?.length > 0 && (
        <section className="infoSection" id="stack">
          <div className="titleInfoContainer">
            <TextSemiBoldComponent text="Información" size={25} weight="600" />
            <CommonText text="Conoce más sobre nuestras plataformas y cómo funcionan" />
          </div>
          <div className="cardInfo">
            {cardInfo?.map((item) => (
              <CardSmallComponent
                key={item.id}
                title={item.title}
                description={item.description}
                iconName={item.icon}
              />
            ))}
          </div>
        </section>
      )}

      {info?.length > 0 &&
        info?.map((item, index) => (
          <section id="info">
            <InfoComponent
              key={item.id}
              title={item.title}
              description={item.description}
              img={item.filepath}
              index={index}
            />
          </section>
        ))}
      {cardImageInfo?.length > 0 && (
        <section className="sectionCardImage" id="pages">
          {cardImageInfo?.map((item) => (
            <CardImageComponent
              image={item.filepath}
              key={item.id}
              text={item.title}
              link={item.link}
            />
          ))}
        </section>
      )}

      <FooterCompoent />
    </>
  );
};

export default Home;
