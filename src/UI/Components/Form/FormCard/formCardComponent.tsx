import { ReactNode, useEffect, useState } from "react";
import { TextSemiBoldComponent } from "../../Texts";
import {
  InputImageComponent,
  InputLongTextComponent,
  InputTextComponent,
} from "../Inputs";
import AllIconsSelectComponent from "../../ImagesContainer/IconComponent/AllIconsSelect/allIconsSelectComponent";
import { PostInfo } from "../../../../interfaces/PostInfo";
import PostInfoService from "../../../../service/info/PostInfoService";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../Buttons";
import { useAuth } from "../../../../Context/Auth/AuthContext";
import { SuccessModal } from "../../Modal";
import { toast } from "react-toastify";

type Props = {
  name: string;
  children: ReactNode;
  id: string;
};

const FormCardComponent = ({ children, name, id }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const { token } = useAuth();
  const [formData, setFormData] = useState<PostInfo>({
    type_id: id,
    title: null,
    description: null,
    icon: null,
    link: null,
    filename: null,
  });

  const handleChange =
    (field: keyof PostInfo) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  const handleIconSelect = (icon: string) => {
    setFormData((prev) => ({ ...prev, icon }));
  };

  const handleImageUpload = (imageData: string, filename: string, file: File) => {
    setFormData((prev) => ({ ...prev, filename: file }));
  };

const handleSubmit = async () => {
  // Validaciones básicas según tipo
  if (name === "Información herramientas observabilidad") {
    if (!formData.icon || !formData.title || !formData.description) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
  }

  if (name === "Tarjeta con imagen") {
    if (!formData.link || !formData.description || !formData.filename) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
  }

  if (name === "Herramientas observabilidad") {
    if (!formData.filename) {
      toast.error("Por favor, agrega una imagen.");
      return;
    }
  }

  if (name === "Información relevante") {
    if (!formData.title || !formData.description || !formData.filename) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }
  }

  try {
    await PostInfoService(formData, token);
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error al enviar la petición:", error);
    toast.error("Error al enviar la información. Intenta nuevamente.");
  }
};

  useEffect(() => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        type_id: id,
      }));
    }
  }, [id]);

  return (
    <>
      <div className="FormCard">
        <div className="CardText">
          <TextSemiBoldComponent
            text="Información observabilidad"
            weight="700"
            size={24}
          />
          <TextSemiBoldComponent
            weight="200"
            text="Especifica donde quieres añadir la información"
          />
        </div>

        {children}

        {name === "Información herramientas observabilidad" && (
          <>
            <AllIconsSelectComponent
              text="Selecciona un ícono"
              onSelect={handleIconSelect}
            />
            <InputTextComponent
              text="Nombre de la herramienta"
              onChange={handleChange("title")}
            />
            <InputLongTextComponent
              text="Descripción"
              onChange={handleChange("description")}
            />
          </>
        )}
        
        {name === "Tarjeta con imagen" && (
          <>
            <InputTextComponent text="Link" onChange={handleChange("link")} />
            <InputLongTextComponent text="Descripción" onChange={handleChange("description")} />
            <InputImageComponent onImageUpload={handleImageUpload} text="Añade una imagen de muestra" />
          </>
        )}

        {name === "Herramientas observabilidad" && (
          <>
            <InputImageComponent onImageUpload={handleImageUpload} text="Ícono de la herramienta"/>
          </>
        )}

        {name === "Información relevante" && (
          <>
            <InputTextComponent text="Titulo" onChange={handleChange("title")} />
            <InputLongTextComponent text="Descripción" onChange={handleChange("description")} />
            <InputImageComponent onImageUpload={handleImageUpload} text="Agrega una imagen de lo que quieres mostrar"/>
          </>
        )}
        {
          formData.type_id ? (
            <CommonButton title="Enviar" onClick={handleSubmit} />
          ) : null
        }
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false)
        navigate('/main')
        }} />
    </>
  );
};

export default FormCardComponent;
