import { useCallback, useEffect, useState } from "react";
import { FooterCompoent, HeaderLoginComponent } from "../../Components";
import {
  SearchComponent,
  ButtonSelectComponent,
} from "../../Components/Table/Components";
import { SquarePen } from "lucide-react";
import { GetTokens, UpdateToken } from "../../../service";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { toast } from "react-toastify";
import { EditTokenModal } from "../../Components/Modal";
import { Tokens } from "../../../interfaces/Tokens";

const ManageTokenScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [tokens, setTokens] = useState<Tokens[]>([]);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Tokens | null>(null);

  const { token } = useAuth();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const filteredInfo = tokens.filter((item) => {
    const name = item.title?.toLowerCase() ?? "";
    const email = item.user.name?.toLowerCase() ?? "";
    const term = searchTerm.toLowerCase();

    return name.includes(term) || email.includes(term);
  });

  // Calculate pagination
  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(filteredInfo.length / itemsToShow);
  const visibleRows = filteredInfo.slice(startIndex, startIndex + itemsToShow);

  const handleGetTokens = useCallback(async () =>{
    try {
      const data = await GetTokens(token);
      setTokens(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al obtener usuarios: " + error.message);
      } else {
        toast.error("Ocurrió un error inesperado al obtener los usuarios.");
      }
    }
  }, [token])

  // Función para abrir el modal de edición
  const handleEditUser = (user: Tokens) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateToken = async (tokenData: {
    id: string;
    title: string;
    token: string;
  }) => {
    try {

      const response = await UpdateToken(token, tokenData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Token actualizado correctamente");
        handleGetTokens(); // Recargar la lista
      } else {
        toast.error("Error al actualizar el token");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al actualizar el token: " + error.message);
      } else {
        toast.error("Ocurrió un error inesperado al actualizar el token.");
      }
    }
  };

  useEffect(() => {
    handleGetTokens();
  }, [handleGetTokens]);

  return (
    <>
      <HeaderLoginComponent Button={false} />
      <section
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: "0 0 20px 0",
              fontSize: "24px",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            Gestión de tokens
          </h1>

          {/* Search Component */}
          <SearchComponent
            onSelect={handleSelect}
            onSearch={handleSearch}
            searchValue={searchTerm}
          />
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ID
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Título
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Token
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Añaido por
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((token) => (
                  <tr
                    key={token.id}
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      {token.id}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#1f2937",
                              marginBottom: "2px",
                            }}
                          >
                            {token.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      {`${token.token.slice(0, 6)}****${token.token.slice(-4)}`}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {token.user.name}
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <SquarePen
                          className="editIcon"
                          onClick={() => handleEditUser(token)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ButtonSelectComponent
            currentPage={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </section>

      <EditTokenModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        token={selectedUser} // Cambiar 'user' por 'token'
        onSave={handleUpdateToken} // Cambiar handleUpdateUser por handleUpdateToken
      />

      <FooterCompoent />
    </>
  );
};

export default ManageTokenScreen;
