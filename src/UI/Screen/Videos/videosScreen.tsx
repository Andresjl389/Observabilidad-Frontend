import React, { useCallback, useEffect, useState } from "react";
import {
  Play,
  BookOpen,
} from "lucide-react";
import { SearchComponent } from "../../Components/Table/Components";
import { ButtonSelectComponent } from "../../Components/Table/Components/ButtonSelect";
import { FooterCompoent, HeaderLoginComponent } from "../../Components";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { GetVideos } from "../../../service";
import { Videos } from "../../../interfaces/videos";
import { toast } from "react-toastify";


const VideosSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const [videos, seVideos] = useState<Videos[]>([])
  const { token } = useAuth()

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleVideos = useCallback(async () => {
    try {
      const response = await GetVideos(token);
      seVideos(response);
    } catch (error) {
      toast.error(`Ocurrió un error al obtener los videos`)
    }
  }, [token]);

    useEffect(() => {
    handleVideos();
  }, [handleVideos]);


  const filteredVideos = videos?.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate pagination
  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(filteredVideos?.length / itemsToShow);
  const visibleRows = filteredVideos?.slice(
    startIndex,
    startIndex + itemsToShow
  );

  useEffect(() => {
    setPage(1);
  }, [itemsToShow]);

  return (
    <>
      <HeaderLoginComponent Button={false} />
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Header */}
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
            Videos y Capacitaciones
          </h1>

          {/* Search Component */}
          <SearchComponent
            onSelect={handleSelect}
            onSearch={handleSearch}
            searchValue={searchTerm}
          />
        </div>

        {/* Videos Table */}
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
                    Descripción
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
                    Visitar
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRows?.map((video, index) => (
                  <tr
                    key={video.id}
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
                      {video.id}
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
                            {video.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "15px",
                        fontSize: "14px",
                        color: "#374151",
                      }}
                    >
                      {video.description}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          style={{
                            padding: "8px",
                            border: "none",
                            borderRadius: "4px",
                            backgroundColor: "#dc2626",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#b91c1c";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#dc2626";
                          }}
                          title="Reproducir"
                          onClick={() =>
                            window.open(video.link, "_blank")
                          }
                        >
                          <Play size={16} />
                        </button>
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

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#dc2626",
                }}
              >
                <Play size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#1f2937" }}>
                  Total Videos
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#dc2626",
                  }}
                >
                  {videos?.length}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fffbeb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#d97706",
                }}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#1f2937" }}>
                  Resultados
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#d97706",
                  }}
                >
                  {filteredVideos?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCompoent />
    </>
  );
};

export default VideosSection;
