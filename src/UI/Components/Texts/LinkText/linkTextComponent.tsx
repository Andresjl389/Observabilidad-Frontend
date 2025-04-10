import * as Icons from "react-icons/fa";
import { ElementType } from "react";
import '../../../../Assets/Styles/Components/Texts/Linktext/linkTextComponent.css'
import { TextSemiBoldComponent } from "../Title";


type Props = {
  link: string;
};

const LinkTextComponent = ({ link }: Props) => {
    const IconComponent: ElementType = (Icons as any)['FaArrowRight'] || Icons.FaRegQuestionCircle;
  

  return (
    <>
      <a className="linkText" target="_blank" href={link}>Ver mas<IconComponent /></a>
    </>
  );
};

export default LinkTextComponent;
