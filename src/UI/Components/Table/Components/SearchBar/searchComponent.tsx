import { TextSemiBoldComponent } from "../../../Texts";
import { FaSearch } from "react-icons/fa";

type Props = {
  onSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearch?: () => void;
};

const SearchComponent = ({onSelect}:Props) => {
  const SearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  

  return (
    <>
      <section className="SearchSection">
        <div className="ShowSelectContainer">
          <TextSemiBoldComponent text="Mostrar" />
          <select className="SearchSelect" onChange={onSelect}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="SearchInputWrapper">
          <SearchIcon className="SearchIcon" />
          <input className="SearchInput" type="text" placeholder="Buscar..." />
        </div>
      </section>
    </>
  );
};

export default SearchComponent;
