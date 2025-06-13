
type Props = {
    text: string
    onClick?: () => void
    style?: {}
}

const TitleComponent = ({text, onClick, style}:Props) => {
    return(
        <>
            <h1 onClick={onClick} style={style}>{text}</h1>
        </>
    )
}

export default TitleComponent