import { TextSemiBoldComponent } from "../../../Texts";

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const ButtonSelectComponent = ({ currentPage, setPage, totalPages }: Props) => {
  return (
    <div className="ButtonsPrevNextContainer">
      <div className="TextPrevNext">
        <TextSemiBoldComponent
          weight="300"
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          text="Anterior"
        />
      </div>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          className={
            pageNum === currentPage ? "ButtonSelected" : "ButtonSelect"
          }
          onClick={() => setPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <div className="TextPrevNext">
        <TextSemiBoldComponent
          text="Siguiente"
          weight="300"
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
        />
      </div>
    </div>
  );
};

export default ButtonSelectComponent;
