import React, { useState, useEffect } from "react";
import { X, SquarePen } from "lucide-react";
import { GetTypes } from "../../../../service";
import { Info } from "../../../../interfaces/info";
import { Types } from "../../../../interfaces/types";
import { UUID } from "crypto";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: Info | null;
  onSave: (infoData: {
    id: UUID;
    type_id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
  }) => void;
  token: string | null;
}

const EditUserModalComponent: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  info,
  onSave,
  token,
}) => {
  const [formData, setFormData] = useState({
    type_id: "",
    title: "",
    description: "",
    icon: "",
    link: "",
  });
  const [types, setTypes] = useState<Types[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Función para obtener los tipos
  const fetchTypes = async () => {
    try {
      const typesData = await GetTypes();
      setTypes(typesData);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    if (isOpen && info) {
      setFormData({
        type_id: info.type_id || "",
        title: info.title || "",
        description: info.description || "",
        icon: info.icon || "",
        link: info.link || "",
      });
      fetchTypes();
      setErrors({});
    }
  }, [isOpen, info]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.type_id) {
      newErrors.type_id = "El tipo de información es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !info) return;

    setLoading(true);
    try {
      // Enviar los datos del formulario, no los datos originales
      await onSave({
        id: info.id,
        type_id: formData.type_id,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        link: formData.link,
      });
      onClose();
    } catch (error) {
      console.error("Error updating info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          border: "1px solid #f1f5f9",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 24px 24px 24px",
            borderBottom: "1px solid #f1f5f9",
            position: "relative",
          }}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <X size={20} color="#64748b" />
          </button>

          {/* Icono de editar */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#ED1C28",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <SquarePen size={28} color="white" />
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "#1e293b",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Editar Información
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#64748b",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Modifica la información que vas a mostrar
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "24px" }}>
            {/* Campo ID (solo lectura) */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                ID de la información
              </label>
              <input
                type="text"
                value={info?.id || ""}
                disabled
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "14px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  boxSizing: "border-box",
                  fontWeight: "500",
                }}
              />
            </div>

            {/* Campo Título */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ingresa el título"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `2px solid ${errors.title ? "#ef4444" : "#f1f5f9"}`,
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontWeight: "500",
                }}
                onFocus={(e) => {
                  if (!errors.title) {
                    e.target.style.borderColor = "#ED1C28";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(237, 28, 40, 0.1)";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.title) {
                    e.target.style.borderColor = "#f1f5f9";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
              {errors.title && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "6px",
                    margin: "6px 0 0 0",
                    fontWeight: "500",
                  }}
                >
                  {errors.title}
                </p>
              )}
            </div>

            {/* Campo Tipo de información */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Tipo de información *
              </label>
              <select
                name="type_id"
                value={formData.type_id}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `2px solid ${errors.type_id ? "#ef4444" : "#f1f5f9"}`,
                  borderRadius: "12px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  if (!errors.type_id) {
                    e.target.style.borderColor = "#ED1C28";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(237, 28, 40, 0.1)";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.type_id) {
                    e.target.style.borderColor = "#f1f5f9";
                    e.target.style.boxShadow = "none";
                  }
                }}
              >
                <option value="">Selecciona un tipo de información</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.type_id && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "6px",
                    margin: "6px 0 0 0",
                    fontWeight: "500",
                  }}
                >
                  {errors.type_id}
                </p>
              )}
            </div>

            {/* Campo Descripción */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción"
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: `2px solid ${
                    errors.description ? "#ef4444" : "#f1f5f9"
                  }`,
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontWeight: "500",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  if (!errors.description) {
                    e.target.style.borderColor = "#ED1C28";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(237, 28, 40, 0.1)";
                  }
                }}
                onBlur={(e) => {
                  if (!errors.description) {
                    e.target.style.borderColor = "#f1f5f9";
                    e.target.style.boxShadow = "none";
                  }
                }}
              />
              {errors.description && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginTop: "6px",
                    margin: "6px 0 0 0",
                    fontWeight: "500",
                  }}
                >
                  {errors.description}
                </p>
              )}
            </div>

            {/* Campo Icono */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Icono
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="Ingresa el icono"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontWeight: "500",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ED1C28";
                  e.target.style.boxShadow = "0 0 0 3px rgba(237, 28, 40, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f1f5f9";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Campo Link */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Link
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #f1f5f9",
                  borderRadius: "12px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  fontWeight: "500",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ED1C28";
                  e.target.style.boxShadow = "0 0 0 3px rgba(237, 28, 40, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f1f5f9";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              padding: "24px",
              borderTop: "1px solid #f1f5f9",
              backgroundColor: "#fafbfc",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 24px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                backgroundColor: "white",
                color: "#64748b",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: "120px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: loading ? "#94a3b8" : "#ED1C28",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                minWidth: "120px",
                boxShadow: loading
                  ? "none"
                  : "0 4px 12px rgba(237, 28, 40, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#C70E19";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(237, 28, 40, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#ED1C28";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(237, 28, 40, 0.3)";
                }
              }}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModalComponent;
