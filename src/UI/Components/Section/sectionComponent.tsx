import { ReactNode } from "react"
import '../../../Assets/Styles/Components/Section/sectionComponent.css'



type Props = {
    children?: ReactNode;
}

const SectionComponent = ({children}:Props) => {
    return(
        <>
            <div className="section">
                {children}
            </div>
        </>
    )
}

export default SectionComponent