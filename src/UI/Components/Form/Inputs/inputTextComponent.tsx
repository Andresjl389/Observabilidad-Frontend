import { TextField } from "@mui/material";
import { TextSemiBoldComponent } from "../../Texts";

const style = {
  borderBottom: "2px solid var(--primary-color)",
  borderRadius: "10px",
  width: "100%",
};

type Props = {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Para manejar los cambios en el input de texto
};

const InputTextComponent = ({ text, onChange }: Props) => {
  return (
    <>
      <div className="InputContainer">
        <TextSemiBoldComponent text={text} size={16} weight="300" />
        <TextField
          style={style}
          variant="standard"
          onChange={onChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              paddingLeft: "20px",
            },
          }}
          className="InputContainer"
        />
      </div>
    </>
  );
};

export default InputTextComponent;
