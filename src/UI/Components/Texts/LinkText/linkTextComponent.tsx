import * as Icons from "react-icons/fa";
import { ElementType } from "react";
import '../../../../Assets/Styles/Components/Texts/Linktext/linkTextComponent.css'

type Props = {
  link: string;
};

const LinkTextComponent = ({ link }: Props) => {
  const IconComponent: ElementType = (Icons as any)['FaArrowRight'] || Icons.FaRegQuestionCircle;

  return (
    <>
      <a className="linkText" target="_blank" rel="noreferrer" href={link}>
        Ver más <IconComponent />
      </a>
    </>
  );
};

export default LinkTextComponent;
