import { TextField } from "@mui/material";
import { TextSemiBoldComponent } from "../../Texts";

const style = {
  borderBottom: "2px solid var(--primary-color)",
  borderRadius: "10px",
  width: "100%",
};

type Props = {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputLongTextComponent = ({ text, onChange }: Props) => {
  return (
    <>
      <div className="InputContainer">
        <TextSemiBoldComponent text={text} size={16} weight="300" />
        <TextField
          variant="standard"
          multiline
          rows={4}
          fullWidth
          style={style}
          onChange={onChange}
          sx={{
            pl: 2,
            width: "100%",
            "& .MuiInput-underline:before": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none", 
            },
          }}
          className="InputContainer"
        />
      </div>
    </>
  );
};

export default InputLongTextComponent;
