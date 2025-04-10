
type Props = {
    text: string
}

const TitleComponent = ({text}:Props) => {
    return(
        <>
            <h1>{text}</h1>
        </>
    )
}

export default TitleComponent