import { CommonText, TextSemiBoldComponent } from "../Texts";
import '../../../Assets/Styles/Components/Info/infoComponent.css'


type Props = {
    title: string;
    description: string;
    img: any;
    index: number;
}

const InfoComponent = ({title, description, img, index}:Props) => {
  return (
    <>
      <section className={index % 2 ? 'info' : 'infoReverse'}>
            <img src={img} className="imgInfo" alt="infoImage"/>
            <div className="infoContainer">
                <TextSemiBoldComponent text={title} size={50} weight="700"/>
                <CommonText text={description} size={16} />
            </div>
      </section>
    </>
  );
};

export default InfoComponent;
