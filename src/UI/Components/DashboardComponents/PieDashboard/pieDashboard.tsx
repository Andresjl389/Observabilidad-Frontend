type Props = {
  percentage?: number; // puede ser undefined
  label: string;
};

const PieDashboardComponent = ({ percentage, label }: Props) => {
  const safePercentage = typeof percentage === "number" && !isNaN(percentage) ? percentage : 0;

  // Para la visualización gráfica (SVG)
  const strokeValue = safePercentage * 100 * 2.51; // 100% = 251 stroke total

  // Define el color según el valor y el label
  const handleColor = () => {
    if (safePercentage <= 1) {
      if (safePercentage >= 0.97) return "green";
      if (safePercentage >= 0.90) return "blue";
      return "red";
    }
    if (safePercentage >= 96) return "green";
    if (safePercentage >= 80) return "blue";
    return "red";
  };

  const color = handleColor();

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
          <span>{safePercentage.toFixed(2)}</span>
        </div>
      </div>
      <p className="chart-label">{label}</p>
    </div>
  );
};

export default PieDashboardComponent;
