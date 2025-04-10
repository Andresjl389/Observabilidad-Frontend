import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
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
  onSelect: (icon: string) => void; // Para manejar la selección del ícono
};

const AllIconsSelectComponent = ({ text, onSelect }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    setSelectedIcon(selected);
    onSelect(selected); // Pasa el valor seleccionado al padre
  };

  return (
    <div className="InputContainer">
      <TextSemiBoldComponent text={text} size={16} weight="300" />
      <Select
        value={selectedIcon}
        onChange={handleChange}
        className="SelectComponent"
        variant="standard"
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
            {Icon ? <Icon size={20} style={{ marginRight: 8 }} /> : null} {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default AllIconsSelectComponent;
