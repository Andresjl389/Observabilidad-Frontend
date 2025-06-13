type Props = {
    percentage: number; // puede ser 0.90 o 98
    label: string;
  };
  
  const PieDashboardComponent = ({ percentage, label }: Props) => {

    // Normaliza el valor según el tipo de métrica
    const displayValue = percentage <= 1 ? percentage * 100 : percentage;
  
    // Define el color según el valor y el label
    const handleColor = () => {
      if (percentage <= 1) {
        if (percentage >= 0.97) return "green";
        if (percentage >= 0.90) return "blue";
        return "red";
      }
        if (percentage >= 96) return "green";
        if (percentage >= 80) return "blue";
        return "red";
    };
  
    const color = handleColor();
    const strokeValue = displayValue * 2.51;

  
    return (
      <div className="chart-item">
        <div className="pie-chart">
          <div className={`chart-background ${color}-light`}></div>
  
          <svg className="chart-svg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              className={`chart-circle ${color}`}
              strokeWidth="12"
              strokeDasharray={`${strokeValue} 251`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
  
          <div className="percentage">
            <span>{percentage.toFixed(2)}</span>
          </div>
        </div>
        <p className="chart-label">{label}</p>
      </div>
    );
  };
  
  export default PieDashboardComponent;
  