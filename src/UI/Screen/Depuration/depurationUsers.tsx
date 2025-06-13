import React, { useState, useRef } from "react";
import { FooterCompoent, HeaderLoginComponent } from "../../Components";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { PostDepuration } from "../../../service/Depuration";

interface DepurationStatus {
  isProcessing: boolean;
  processedUsers: number;
  totalUsers: number;
  errors: string[];
  completed: boolean;
}

const UserDepurationSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<DepurationStatus>({
    isProcessing: false,
    processedUsers: 0,
    totalUsers: 0,
    errors: [],
    completed: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth()

  const handleFileSelect = (file: File) => {
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setStatus((prev) => ({ ...prev, errors: [], completed: false }));
    } else {
      setStatus((prev) => ({
        ...prev,
        errors: ["Por favor seleccione un archivo CSV válido."],
      }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Función para contar usuarios en el CSV
  const countUsersInCSV = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n').filter(line => line.trim() !== '');
          // Resta 1 para excluir el header
          const userCount = Math.max(0, lines.length - 1);
          resolve(userCount);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Error leyendo el archivo'));
      reader.readAsText(file);
    });
  };

  const handleDepuration = async () => {
    if (!selectedFile) return;

    try {
      // Contar usuarios en el CSV
      const totalUsers = await countUsersInCSV(selectedFile);
      
      setStatus({
        isProcessing: true,
        processedUsers: 0,
        totalUsers,
        errors: [],
        completed: false,
      });

      // Ejecutar la depuración real
      const response = await PostDepuration(token, selectedFile);

      // Completar
      setStatus(prev => ({
        ...prev,
        isProcessing: false,
        processedUsers: totalUsers,
        completed: true,
      }));

      console.log('Depuración completada:', response);

    } catch (error) {
      console.error('Error en la depuración:', error);
      setStatus(prev => ({
        ...prev,
        isProcessing: false,
        errors: [...prev.errors, 'Error durante la depuración. Inténtalo de nuevo.'],
      }));
    }
  };

  const resetDepuration = () => {
    setSelectedFile(null);
    setStatus({
      isProcessing: false,
      processedUsers: 0,
      totalUsers: 0,
      errors: [],
      completed: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <HeaderLoginComponent Button={false} />

      {/* Contenido principal */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#1F2937",
            marginBottom: "16px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Depuración de Usuarios
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6B7280",
            marginBottom: "32px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Sube un archivo CSV con los usuarios que necesitas depurar. El sistema
          procesará cada usuario y te mostrará el estado del proceso.
        </p>

        {/* Card principal */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "32px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
          }}
        >
          {/* Área de carga de archivo */}
          <div
            style={{
              border: `2px dashed ${dragOver ? "#E53E3E" : "#D1D5DB"}`,
              borderRadius: "8px",
              padding: "48px 24px",
              textAlign: "center",
              backgroundColor: dragOver ? "#FEF2F2" : "#FAFAFA",
              marginBottom: "24px",
              transition: "all 0.2s ease",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />

            <div
              style={{
                color: selectedFile ? "#059669" : "#6B7280",
                marginBottom: "16px",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ margin: "0 auto 16px" }}
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                <path d="M8,12H16M8,16H13" />
              </svg>
            </div>

            {selectedFile ? (
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#059669",
                    marginBottom: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  ✓ {selectedFile.name}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Archivo listo para procesar
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#1F2937",
                    marginBottom: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Arrastra y suelta tu archivo CSV aquí
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    marginBottom: "16px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  o haz clic para seleccionar un archivo
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    backgroundColor: "#E53E3E",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Seleccionar archivo
                </button>
              </div>
            )}
          </div>

          {/* Errores */}
          {status.errors.length > 0 && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "24px",
              }}
            >
              {status.errors.map((error, index) => (
                <p
                  key={index}
                  style={{
                    color: "#DC2626",
                    fontSize: "14px",
                    margin: 0,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  ⚠️ {error}
                </p>
              ))}
            </div>
          )}

          {/* Estado de procesamiento */}
          {status.isProcessing && (
            <div
              style={{
                marginBottom: "24px",
                padding: "20px",
                backgroundColor: "#F8FAFC",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #E5E7EB",
                  borderTop: "4px solid #3B82F6",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1F2937",
                  margin: "0 0 8px 0",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                🔄 Procesando depuración...
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                Por favor espera mientras se procesan {status.totalUsers} usuarios.
                <br />
                Este proceso puede tomar varios minutos.
              </p>
            </div>
          )}

          {/* Resultado completado */}
          {status.completed && (
            <div
              style={{
                marginBottom: "24px",
                padding: "20px",
                backgroundColor: "#F0FDF4",
                borderRadius: "8px",
                border: "1px solid #BBF7D0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#10B981",
                  borderRadius: "50%",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#059669",
                  margin: "0 0 8px 0",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                ✅ Depuración completada exitosamente
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#047857",
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                Se han procesado {status.totalUsers} usuarios correctamente.
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={resetDepuration}
              disabled={status.isProcessing}
              style={{
                backgroundColor: "transparent",
                color: "#6B7280",
                border: "1px solid #D1D5DB",
                borderRadius: "6px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: status.isProcessing ? "not-allowed" : "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                opacity: status.isProcessing ? 0.5 : 1,
              }}
            >
              Resetear
            </button>

            <button
              onClick={handleDepuration}
              disabled={!selectedFile || status.isProcessing}
              style={{
                backgroundColor:
                  !selectedFile || status.isProcessing ? "#9CA3AF" : "#E53E3E",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor:
                  !selectedFile || status.isProcessing
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "system-ui, -apple-system, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {status.isProcessing && (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid transparent",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              )}
              {status.isProcessing ? "Depurando..." : "Ejecutar Depuración"}
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <div
          style={{
            backgroundColor: "#EBF8FF",
            border: "1px solid #BEE3F8",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#2B6CB0",
              marginBottom: "8px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            💡 Información importante:
          </h4>
          <ul
            style={{
              fontSize: "14px",
              color: "#2C5282",
              margin: 0,
              paddingLeft: "20px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            <li>
              El archivo CSV debe contener una columna con los emails de los
              usuarios
            </li>
            <li>
              El archivo CSV debe contener una fila con el campo "usuarios"
            </li>
            <li>
              El proceso puede tomar varios minutos dependiendo del número de
              usuarios
            </li>
            <li>
              Se mostrará el estado del proceso durante la depuración
            </li>
            <li>Los usuarios depurados serán removidos del sistema</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <FooterCompoent />
    </>
  );
};

export default UserDepurationSection;