import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type IconComponentProps = {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: ReactNode
};

const CardMainComponent = ({ id, title, description, path, icon }: IconComponentProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div key={id} className="nav-card" onClick={() => handleNavigate(path)}>
      <div className="card-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="card-arrow">
        <span>&#10132;</span>
      </div>
    </div>
  );
};

export default CardMainComponent;
