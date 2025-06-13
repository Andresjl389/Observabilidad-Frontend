import { FooterCompoent, HeaderLoginComponent, TableComponent } from "../../Components";
import '../../../Assets/Styles/UI/Table/table.css'

const TableScreen = () => {
  return (
    <>
      <HeaderLoginComponent Button={false} />
        <section className="TableSection">
        <TableComponent />

        </section>
      <FooterCompoent />
    </>
  );
};

export default TableScreen;
