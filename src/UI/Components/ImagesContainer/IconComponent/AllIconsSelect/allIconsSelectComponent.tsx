import { Select, MenuItem, SelectChangeEvent, FormHelperText, FormControl } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import { TextSemiBoldComponent } from "../../../Texts";
import { useState } from "react";

const allFaIcons = Object.entries(FaIcons)
  .filter(([_, Icon]) => typeof Icon === "function")
  .map(([name, Icon]) => ({
    name,
    Icon: Icon as React.ComponentType<{
      size?: number;
      style?: React.CSSProperties;
    }>,
  }));

type Props = {
  text: string;
  onSelect: (icon: string) => void;
};

const AllIconsSelectComponent = ({ text, onSelect }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    setSelectedIcon(selected);
    setError(false); // limpia el error si ya se seleccionó algo
    onSelect(selected);
  };

  const handleBlur = () => {
    if (!selectedIcon) {
      setError(true); // activa el error si no hay selección
    }
  };

  return (
    <div className="InputContainer">
      <TextSemiBoldComponent text={text} size={16} weight="300" />
      <FormControl
        fullWidth
        variant="standard"
        error={error}
        onBlur={handleBlur}
      >
        <Select
          value={selectedIcon}
          onChange={handleChange}
          displayEmpty
          style={{
            paddingLeft: 20,
            borderBottom: "2px solid var(--primary-color)",
            borderRadius: "10px",
          }}
          sx={{
            "&:before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
          }}
        >
          <MenuItem value="" disabled>
            Selecciona un ícono
          </MenuItem>
          {allFaIcons.map(({ name, Icon }) => (
            <MenuItem key={name} value={name}>
              {Icon && <Icon size={20} style={{ marginRight: 8 }} />} {name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>Este campo es obligatorio</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default AllIconsSelectComponent;
