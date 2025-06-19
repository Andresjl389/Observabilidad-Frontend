import React, { useEffect, useState } from "react";
import {
  Play,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import { SearchComponent } from "../../Components/Table/Components";
import { ButtonSelectComponent } from "../../Components/Table/Components/ButtonSelect";
import { FooterCompoent, HeaderLoginComponent } from "../../Components";

interface Video {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  thumbnail: string;
}

const VideosSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsToShow, setItemsToShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsToShow(parseInt(event.target.value));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const videos: Video[] = [
    {
      id: "#VID001",
      title: "Introducción a GRP Observabilidad",
      instructor: "Carlos Mendoza",
      duration: "15:30",
      thumbnail: "🎥",
    },
    {
      id: "#VID002",
      title: "Monitoreo Avanzado de Aplicaciones",
      instructor: "María González",
      duration: "28:45",
      thumbnail: "📊",
    },
    {
      id: "#VID003",
      title: "Configuración de Alertas Inteligentes",
      instructor: "Roberto Silva",
      duration: "35:20",
      thumbnail: "🔔",
    },
    {
      id: "#VID004",
      title: "Dashboard Creation Best Practices",
      instructor: "Ana Rodríguez",
      duration: "42:15",
      thumbnail: "📈",
    },
    {
      id: "#VID005",
      title: "Troubleshooting con Logs",
      instructor: "Diego Martín",
      duration: "20:30",
      thumbnail: "🔍",
    },
    {
      id: "#VID006",
      title: "Métricas Personalizadas",
      instructor: "Patricia López",
      duration: "33:10",
      thumbnail: "📏",
    },
    {
      id: "#VID007",
      title: "Optimización de Performance",
      instructor: "Luis García",
      duration: "38:50",
      thumbnail: "⚡",
    },
    {
      id: "#VID008",
      title: "Seguridad en Monitoreo",
      instructor: "Carmen Torres",
      duration: "25:15",
      thumbnail: "🔒",
    },
    {
      id: "#VID009",
      title: "Integración con APIs",
      instructor: "Miguel Herrera",
      duration: "31:20",
      thumbnail: "🔗",
    },
    {
      id: "#VID010",
      title: "Machine Learning en Observabilidad",
      instructor: "Sandra Ruiz",
      duration: "45:30",
      thumbnail: "🤖",
    },
  ];

  // Filter videos based on search term
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate pagination
  const startIndex = (page - 1) * itemsToShow;
  const totalPages = Math.ceil(filteredVideos.length / itemsToShow);
  const visibleRows = filteredVideos.slice(
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
                    Video
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
                    Instructor
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
                    Duración
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
                {visibleRows.map((video, index) => (
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
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            backgroundColor: "#f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          {video.thumbnail}
                        </div>
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
                      {video.instructor}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "14px",
                          color: "#374151",
                        }}
                      >
                        <Clock size={14} />
                        {video.duration}
                      </div>
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
                            console.log(`Reproducir video: ${video.title}`)
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
                  {videos.length}
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
                  backgroundColor: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#16a34a",
                }}
              >
                <Users size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#1f2937" }}>
                  Total Vistas
                </h3>
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
                  {filteredVideos.length}
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
