import '../../../../Assets/Styles/Components/Texts/CommonText/CommonTextComponent.css'

type Props = {
    text: string
    styles?: boolean
    size?: number
    color?: boolean
}


const CommonText = ({text, styles, size, color}:Props) =>{
    return(
        <>
            <p className={styles ? 'button' : 'texts' } style={{fontSize: size ? `${size}px` : 'none', color: color ? '#FFFFFF' : '' }}>{text}</p>
        </>
    )
}

export default CommonText