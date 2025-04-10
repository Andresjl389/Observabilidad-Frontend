import '../../../../Assets/Styles/Components/Card/CardImage/cardImage.css'
import { TextSemiBoldComponent, LinkTextComponent } from "../../Texts";

type Props = {
    image: string
    text: string
    link: string
}

const CardImageComponent = ({image, text, link}:Props) => {
    return(
        <>
            <div className="cardImageContainer">
                <div className='imageContainer'>
                    <img className="cardImage" src={image} />
                </div>
                <div className='infoCardContainer'>
                    <TextSemiBoldComponent text={text}/>
                    <LinkTextComponent  link={link} />
                </div>
            </div>
        </> 
    )
}

export default CardImageComponent