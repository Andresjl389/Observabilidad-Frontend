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
import { deleteInfo, GetTypes, UpdateInfo } from "../../../service";
import { Types } from "../../../interfaces/types";
import { SquarePen, Trash2 } from "lucide-react";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { UUID } from "crypto";
import { EditUserModalComponent, SuccessModal } from "../Modal";
import { toast } from "react-toastify";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<Info | null>(null);

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
    setSelectedInfo(null);
  };

  const handleEditInfo = (info: Info) => {
    setSelectedInfo(info);
    setIsModalEditOpen(true);
  };

  const handleUpdateInfo = async (infoData: {
    id: UUID;
    type_id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
  }) => {
    try {
      const response = await UpdateInfo(token, infoData);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Información actualizada correctamente");
        handleInfo();
      } else {
        toast.error("Error al actualizar la información");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al actualizar la información: " + error.message);
      } else {
        toast.error(
          "Ocurrió un error inesperado al actualizar la información."
        );
      }
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const filteredInfo = info.filter((item) => {
    const title = item.title?.toLowerCase() ?? "";
    const description = item.description?.toLowerCase() ?? "";
    const term = searchTerm.toLowerCase();

    return title.includes(term) || description.includes(term);
  });

  const handleInfo = async () => {
    const data = await GetAll();
    if (Array.isArray(data)) {
      setInfo(data);
    } else {
      setInfo([]); // o puedes mostrar un error
      console.error("La respuesta no es un array:", data);
    }
  };

  const handleDelete = async (info_id: UUID) => {
    try {
      const response = await deleteInfo(token, info_id);
      console.log(response);

      if (response?.status === 200) {
        setIsModalOpen(true);
      } else {
        console.error("Error al eliminar:", response);
        // Aquí podrías mostrar un modal de error si tienes uno
      }
    } catch (error) {
      console.error("Excepción en la eliminación:", error);
      // Aquí también podrías mostrar un modal de error
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
    const found = types.find((type) => type.id === id);
    return found ? found.name : "Desconocido";
  };

  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(filteredInfo.length / itemsToShow);
  const visibleRows = filteredInfo.slice(startIndex, startIndex + itemsToShow);

  useEffect(() => {
    setPage(1);
  }, [itemsToShow]);

  useEffect(() => {
    handleInfo();
  }, []);

  return (
    <>
      <SearchComponent
        onSelect={handleSelect}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
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
                  <StyledTableCell>{getTypeName(row.type_id)}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.icon}</StyledTableCell>
                  <StyledTableCell>{row.link}</StyledTableCell>
                  <StyledTableCell>
                    <SquarePen
                      className="editIcon"
                      onClick={() => handleEditInfo(row)}
                    />{" "}
                    <Trash2
                      className="deleteIcon"
                      onClick={() => handleDelete(row.id)}
                    />
                  </StyledTableCell>
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
      <SuccessModal
        isOpen={isModalOpen}
        title="Datos eliminados correctamente"
        message="La información que eliminaste ya no estará publicada y visible para el equipo."
        onClose={() => {
          setIsModalOpen(false);
          handleInfo();
        }}
      />

      <EditUserModalComponent
        isOpen={isModalEditOpen}
        onClose={handleCloseModal}
        info={selectedInfo}
        onSave={handleUpdateInfo}
        token={token}
      />
    </>
  );
};

export default TableComponent;
