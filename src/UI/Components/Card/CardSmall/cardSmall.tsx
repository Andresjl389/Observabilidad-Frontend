import "../../../../Assets/Styles/Components/Card/CardSmall/cardSmall.css";
import { TextSemiBoldComponent } from "../../Texts";
import * as Icons from "react-icons/fa";
import { ElementType } from "react";

type Props = {
  title: string;
  description: string;
  iconName: string;
};

const CardSmallComponent = ({ title, description, iconName }: Props) => {
  // Buscar el icono en el objeto Icons
  const IconComponent: ElementType = (Icons as any)[iconName] || Icons.FaRegQuestionCircle;

  return (
    <div className="cardContainer">
      <div className="icon-container">
        <IconComponent className="icon" />
      </div>
      <TextSemiBoldComponent text={title} size={24} />
      <TextSemiBoldComponent text={description} size={16} weight="300" />
    </div>
  );
};

export default CardSmallComponent;
