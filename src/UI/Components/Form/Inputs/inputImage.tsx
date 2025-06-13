import { useState } from "react";
import { TextSemiBoldComponent } from "../../Texts";
import UploadIcon from "../../../../Assets/Images/uploadIcon.svg";

type Props = {
  onImageUpload: (imageData: string, filename: string, file: File) => void;
  text: string
};

const InputImageComponent = ({onImageUpload, text}:Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFilename(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        onImageUpload(reader.result as string, file.name, file); // Pasar el archivo real
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="InputContainer">
      <TextSemiBoldComponent text={text} size={16} weight="300" />
      <div className="ImageInputContainer">
        <label htmlFor="imageUpload" className="image-upload-label">
          {image ? (
            <img src={image} alt="Preview" className="image-preview"/>
          ) : (
            <div className="upload-placeholder">
              <TextSemiBoldComponent text="Subir imagen" size={16} weight="600" />
              <img src={UploadIcon} alt="Upload Icon"/>
            </div>
          )}
        </label>
      </div>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        required={true}
      />
    </div>
  );
};

export default InputImageComponent;
