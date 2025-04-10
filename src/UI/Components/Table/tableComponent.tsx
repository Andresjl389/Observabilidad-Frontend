import { TextSemiBoldComponent } from "../Texts";
import { SearchComponent } from "./Components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../Assets/Styles/Components/TableComponent/tableComponent.css";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { ButtonSelectComponent } from "./Components/ButtonSelect";
import { Info } from "../../../interfaces/info";
import GetAll from "../../../service/info/getAll";
import { IconContainerComponent } from "../ImagesContainer/IconComponent/IconsC";
import { GetTypes } from "../../../service";
import { Types } from "../../../interfaces/types";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableComponent = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [types, setTypes] = useState<Types[]>([]);
  const [info, setInfo] = useState<Info[]>([]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  
  const handleInfo = async () => {
    const data = await GetAll();
    if (Array.isArray(data)) {
      setInfo(data);
    } else {
      setInfo([]); // o puedes mostrar un error
      console.error("La respuesta no es un array:", data);
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const data = await GetTypes();
      if (Array.isArray(data)) {
        setTypes(data);
      }
    };
    fetchTypes();
  }, []);

  const getTypeName = (id: string): string => {
    // const found = types.find((type) => type.id === id);
    let name = ''
    console.log(types)
    // if(types.id === id ){
    //     name = types.name
    // }
    return name || "Desconocido";
  };

  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(info.length / itemsToShow);
  const visibleRows = info.slice(startIndex, startIndex + itemsToShow);

  useEffect(() => {
    setPage(1);
  }, [itemsToShow]);

  useEffect(() => {
    handleInfo();
  }, []);

  return (
    <>
      <SearchComponent onSelect={handleSelect} />
      <section className="SectionTableContainer">
        <TableContainer component={Paper} style={{ width: "90vw" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Icono</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.filepath ? (
                      <IconContainerComponent src={row.filepath} />
                    ) : (
                      <TextSemiBoldComponent text="No hay imagen" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>{getTypeName(row.id)}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.icon}</StyledTableCell>
                  <StyledTableCell>{row.link}</StyledTableCell>
                  <StyledTableCell>editar eliminar</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <ButtonSelectComponent
        currentPage={page}
        setPage={setPage}
        totalPages={totalPages}
      />

      <TextSemiBoldComponent text="HOLAAA" />
    </>
  );
};

export default TableComponent;
