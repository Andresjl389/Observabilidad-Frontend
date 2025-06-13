import "../../../../Assets/Styles/Components/Texts/CommonText/CommonTextComponent.css";

type Props = {
  text: string;
  styles?: boolean;
  size?: number;
  color?: boolean;
  onClick?: () => void;
};

const CommonText = ({ text, styles, size, color, onClick }: Props) => {
  return (
    <>
      <p
        onClick={onClick}
        className={styles ? "button" : "texts"}
        style={{
          fontSize: size ? `${size}px` : "none",
          color: color ? "#FFFFFF" : "",
          cursor: onClick ? "pointer" : "",
        }}
      >
        {text}
      </p>
    </>
  );
};

export default CommonText;
