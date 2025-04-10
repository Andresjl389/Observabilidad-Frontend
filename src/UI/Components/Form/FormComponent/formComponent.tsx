import { TextSemiBoldComponent, TitleComponent } from "../../Texts";
import "../../../../Assets/Styles/Components/Form/FormComponent/formComponent.css";
import { FormCardComponent } from "../FormCard";
import { useEffect, useState } from "react";
import { Types } from "../../../../interfaces/types";
import { GetTypes } from "../../../../service";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const FormComponent = () => {
  const [types, setTypes] = useState<Types[]>([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedType = types.find(type => type.name === selectedName);
    
    if (selectedType) {
      setName(selectedName);  // Actualiza el `name` con el valor seleccionado
      setId(selectedType.id); // Actualiza el `id` con el id correspondiente
    }
  };

  const handleInfoType = async () => {
    const data = await GetTypes();
    setTypes(data);
  };

  useEffect(() => {
    handleInfoType();
  }, []);
  return (
    <>
      <section className="FormSection">
        <div className="TitleContainer">
          <TitleComponent text="Añadir información" />
          <TextSemiBoldComponent
            weight="200"
            text="Completa los datos para el módulo de observabilidad.
                 Tomará solo unos minutos. La información que añadas será publicada y 
                 visible para el equipo."
          />
        </div>
        <FormCardComponent name={name} id={id}>
          <div className="InputContainer">
            <TextSemiBoldComponent
              text="Tipo de información"
              size={16}
              weight="300"
            />
            <Select
              className="SelectComponent"
              variant="standard"
              value={name}
              onChange={handleChange}
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
              {types?.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </FormCardComponent>
      </section>
    </>
  );
};

export default FormComponent;
