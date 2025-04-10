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

type Props = {
  name: string;
  children: ReactNode;
  id: string;
};

const FormCardComponent = ({ children, name, id }: Props) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PostInfo>({
    user_id: "340e887e-67f2-4a89-b9b0-aed8b28c6c10",
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
    try {
      const response = await PostInfoService(formData);
      console.log("Respuesta del backend:", response.data);
      navigate('/')
    } catch (error) {
      console.error("Error al enviar la petición:", error);
    } finally {
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
            <InputImageComponent onImageUpload={handleImageUpload} />
          </>
        )}

        {name === "Herramientas observabilidad" && (
          <>
            <InputImageComponent onImageUpload={handleImageUpload} />
          </>
        )}

        {name === "Información relevante" && (
          <>
            <InputTextComponent text="Titulo" onChange={handleChange("title")} />
            <InputLongTextComponent text="Descripción" onChange={handleChange("description")} />
            <InputImageComponent onImageUpload={handleImageUpload} />
          </>
        )}
        {
          formData.type_id ? (
            <CommonButton title="Enviar" onClick={handleSubmit} />
          ) : null
        }
      </div>
    </>
  );
};

export default FormCardComponent;
