import { useEffect, useState, useCallback } from "react";
import { FooterCompoent, HeaderLoginComponent } from "../../Components";
import {
  SearchComponent,
  ButtonSelectComponent,
} from "../../Components/Table/Components";
import { Users } from "../../../interfaces/Users";
import { SquarePen, Trash2 } from "lucide-react";
import { DeleteUser, GetAllUsers } from "../../../service";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { toast } from "react-toastify";
import { EditUserModal } from "../../Components/Modal";
import { UpdateUser } from "../../../service/Auth/Update";


const ManageUserScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<Users[]>([]);
  
  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

  const { token } = useAuth();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const filteredInfo = users.filter((item) => {
    const name = item.name?.toLowerCase() ?? "";
    const email = item.email?.toLowerCase() ?? "";
    const role = item.role.name?.toLowerCase() ?? "";
    const term = searchTerm.toLowerCase();

    return name.includes(term) || email.includes(term) || role.includes(term);
  });

  // Calculate pagination
  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(filteredInfo.length / itemsToShow);
  const visibleRows = filteredInfo.slice(startIndex, startIndex + itemsToShow);

  const handleGetUsers = useCallback(async () => {
  try {
    const data = await GetAllUsers(token);
    setUsers(data);
  } catch (error) {
    if (error instanceof Error) {
      toast.error("Error al obtener usuarios: " + error.message);
    } else {
      toast.error("Ocurrió un error inesperado al obtener los usuarios.");
    }
  }
}, [token]);


  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await DeleteUser(token, userId);
      console.log(response)
      if (response?.status === 200) {
        toast.success("Usuario eliminado correctamente");
        // Opcional: actualiza la lista de usuarios si es necesario
        handleGetUsers();
      } else {
        toast.error("Error al eliminar el usuario.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al eliminar al usuario: " + error.message);
      } else {
        toast.error("Ocurrió un error inesperado al eliminar el usuario.");
      }
    }
  };

  // Función para abrir el modal de edición
  const handleEditUser = (user: Users) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async (userData: {
    id: string;
    name: string;
    email: string;
    roleId: string;
  }) => {
    try {
      const response = await UpdateUser(token, userData)
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Usuario actualizado correctamente");
        handleGetUsers();
      } else {
        toast.error("Error al actualizar el usuario");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error al actualizar el usuario: " + error.message);
      } else {
        toast.error("Ocurrió un error inesperado al actualizar el usuario.");
      }
    }
  };

  useEffect(() => {
    handleGetUsers()
  }, [handleGetUsers])

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
            Gestión de usuarios
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
                    Nombre
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
                    Email
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
                    Role
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
                {visibleRows.map((user, index) => (
                  <tr
                    key={user.id}
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
                      {user.id}
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
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {user.role.name}
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <SquarePen 
                          className="editIcon" 
                          onClick={() => handleEditUser(user)}
                          style={{ cursor: "pointer" }}
                        />
                        <Trash2
                          className="deleteIcon"
                          onClick={() => handleDeleteUser(user.id)}
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

      {/* Modal de edición */}
      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleUpdateUser}
        token={token}
      />

      <FooterCompoent />
    </>
  );
};

export default ManageUserScreen;