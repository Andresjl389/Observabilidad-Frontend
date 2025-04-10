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
import { useEffect, useState } from "react";
import { Types } from "../../../interfaces/types";
import { IconContainerComponent } from '../../Components/ImagesContainer/IconComponent/IconsC'

const Main = () => {
  const [cardImageInfo, setcardImageInfo] = useState<Info[]>([]);
  const [info, setInfo] = useState<Info[]>([]);
  const [cardInfo, setCardInfo] = useState<Info[]>([]);
  const [stack, setstack] = useState<Info[]>([]);
  const [types, setTypes] = useState<Types[]>([]);

  useEffect(() => {
    handleInfoType();
  }, []);

  useEffect(() => {
    if (types?.length > 0) {
      handleInfo();
      handleCardImageInfo()
      handleCardInfo()
      handleStack()
    }
  }, [types]);

  const getId = (name: string) =>  {
    let id: string = '';
    types.forEach((type) => {
      if (type.name === name) {
        id = type.id;
      }
    });
    return id;
  }

  const handleCardImageInfo = async () => {
    const id = getId('Tarjeta con imagen')
    const data = await GetInfo(id);
    setcardImageInfo(data);
  };
  const handleInfo = async () => {
    const id = getId('Información relevante')
    const data = await GetInfo(id);
    setInfo(data);
  };
  const handleCardInfo = async () => {
    const id = getId('Información herramientas observabilidad')
    const data = await GetInfo(id);
    setCardInfo(data);
  };
  const handleStack = async () => {
    const id = getId('Herramientas observabilidad')
    const data = await GetInfo(id);
    setstack(data);
  };

  const handleInfoType = async () => {
    const data = await GetTypes()
    setTypes(data)
  }
  


  return (
    <>
      <SectionComponent>
        <HeaderComponent />
        <section className="introductorySection">
          <div className="introductionSection--moreInfo">
            <TitleSectionComponent
              blackText="Observabilidad y"
              redText="Analítica TI"
            />
            <CommonButton title="About Us" url="/add-information"/>
          </div>
          <img src={firstImg} />
        </section>
      </SectionComponent>
      {stack?.length > 0 && (
        <>
          <section className="platformSection">
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
        <section className="infoSection">
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
          <InfoComponent
            key={item.id}
            title={item.title}
            description={item.description}
            img={item.filepath}
            index={index}
          />
        ))}
      {cardImageInfo?.length > 0 && (
        <section className="sectionCardImage">
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

export default Main;