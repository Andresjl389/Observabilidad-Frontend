import { useNavigate } from 'react-router-dom'
import '../../../../Assets/Styles/Components/Buttons/CommonButton/commonButton.css'
import { CommonText } from '../../Texts'

type Props = {
    title: string
    url?: string
    onClick?: () => void
}

const CommonButton = ({title, url, onClick}: Props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (url) {
            navigate(url);
        }if(onClick) {
            onClick();
        }
    };

    return(
        <>
            <button className='buttons' onClick={handleClick}>
                <CommonText text={title} styles={true} />
            </button>
        </>
    )
}

export default CommonButton