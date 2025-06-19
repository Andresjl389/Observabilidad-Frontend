import "../../../../../Assets/Styles/Components/Texts/TitleSection/titleSectionComponent.css";

type Props = {
  blackText?: string;
  redText?: string;
};

const TitleSectionComponent = ({ blackText, redText }: Props) => {
  return (
    <>
      <div>
        <h1 className="Black">{blackText}</h1>
        <h1 className="Red">{redText}</h1>
      </div>
    </>
  );
};

export default TitleSectionComponent;
