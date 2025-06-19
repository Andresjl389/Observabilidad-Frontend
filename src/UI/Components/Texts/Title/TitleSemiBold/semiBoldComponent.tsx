import "../../../../../Assets/Styles/Components/Texts/TitleSemiBold/semiBoldComponent.css";

type Props = {
  text: string;
  size?: number;
  weight?: string;
  color?: boolean;
  onClick?: () => void
};

const TextSemiBoldComponent = ({ text, size, weight, color, onClick }: Props) => {
  return (
    <>
      <p
        onClick={onClick}
        className={"TitleTextSemiBold"}
        style={{
          fontSize: size ? `${size}px` : "none",
          fontWeight: weight ? `${weight}` : "500",
          color: color ? "#FFFFFF" : "",
        }}
      >
        {text}
      </p>
    </>
  );
};

export default TextSemiBoldComponent;
