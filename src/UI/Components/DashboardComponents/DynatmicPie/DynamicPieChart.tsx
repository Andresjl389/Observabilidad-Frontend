import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  data: { name: string; value: number }[];
}

// Función para generar colores pastel dinámicos según el número de segmentos
const generateColors = (total: number) => {
  return Array.from({ length: total }, (_, index) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 70%)`; // Pastel, luminoso y agradable
  });
};

const DynamicPieChart: React.FC<PieChartProps> = ({ data }) => {
  const colors = generateColors(data.length);

  // Función para renderizar labels personalizados con mejor posicionamiento
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    // Solo mostrar labels para segmentos mayores al 5%
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    // Aumentar el radio para posicionar los labels más afuera
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#666"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="1rem"
        fontWeight="500"
      >
        {`${name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: 400, padding: "20px" }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={100}
            paddingAngle={2}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} usuarios`, name]}
            labelStyle={{ color: '#666' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicPieChart