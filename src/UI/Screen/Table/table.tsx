import { FooterCompoent, HeaderComponent, TableComponent } from "../../Components";
import '../../../Assets/Styles/UI/Table/table.css'

const TableScreen = () => {
  return (
    <>
      <HeaderComponent />
        <section className="TableSection">
        <TableComponent />

        </section>
      <FooterCompoent />
    </>
  );
};

export default TableScreen;
