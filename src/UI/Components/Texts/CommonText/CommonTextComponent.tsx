import { ReactElement } from "react";
import "../../../../Assets/Styles/Components/Texts/CommonText/CommonTextComponent.css";

type Props = {
  text: string;
  styles?: boolean;
  size?: number;
  color?: boolean;
  onClick?: () => void;
  children?: ReactElement
};

const CommonText = ({ text, styles, size, color, onClick, children }: Props) => {
  return (
    <>
      <p
        onClick={onClick}
        className={styles ? "button" : "texts"}
        style={{
          fontSize: size ? `${size}px` : "none",
          color: color ? "#FFFFFF" : "",
          cursor: onClick ? "pointer" : "",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}
      >
        {text}{children}
      </p>
    </>
  );
};

export default CommonText;
