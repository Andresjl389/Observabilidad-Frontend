import { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  useTheme
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { TooltipProps } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { Dispo } from '../../../../interfaces/Disponbilidad';

dayjs.locale('es'); // Establecer el locale globalmente

type CustomDotProps = {
  cx?: number;
  cy?: number;
  index?: number;
};

interface ChartDataPoint {
  name: string;
  value: number;
  date: Date;
  originalMonth: string;
}

type Props = {
  disponibilidad: Dispo[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  title?: string;
};

const ChartOrder = ({ disponibilidad, selectedYear, onYearChange, title = "Disponibilidad SuperApp" }: Props) => {
  const theme = useTheme();
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const handleYearChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onYearChange(newValue.year());
    }
  };

  const parseDate = (mesString: string): Date | null => {
    const isoDateMatch = mesString.match(/\d{4}-\d{2}-\d{2}/);
    if (isoDateMatch) {
      return new Date(isoDateMatch[0]);
    }

    const spanishMonths: { [key: string]: number } = {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };

    const textDateMatch = mesString.match(/(\d+)\s+(\w+)\s+(\d{4})/i);
    if (textDateMatch) {
      const [, day, monthName, year] = textDateMatch;
      const monthIndex = spanishMonths[monthName.toLowerCase()];
      if (monthIndex !== undefined) {
        return new Date(parseInt(year), monthIndex, parseInt(day));
      }
    }

    return null;
  };

  const formatDateForDisplay = (date: Date): string => {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const processChartData = (): ChartDataPoint[] => {
    const dataMap = new Map<string, ChartDataPoint>();

    disponibilidad.forEach(item => {
      const date = parseDate(item.Mes);
      if (!date || date.getFullYear() !== selectedYear) return;

      const dateKey = `${date.getFullYear()}-${date.getMonth()}`;
      const displayName = formatDateForDisplay(date);

      if (dataMap.has(dateKey)) {
        const existing = dataMap.get(dateKey)!;
        if (existing.value === 100 && item['Canales Digitales'] !== 100) {
          dataMap.set(dateKey, {
            name: displayName,
            value: item['Canales Digitales'],
            date: date,
            originalMonth: item.Mes
          });
        }
      } else {
        dataMap.set(dateKey, {
          name: displayName,
          value: item['Canales Digitales'],
          date: date,
          originalMonth: item.Mes
        });
      }
    });

    return Array.from(dataMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const chartData = processChartData();

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && payload[0]?.value !== undefined) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <Paper elevation={3} sx={{ p: 2, bgcolor: 'white', border: '1px solid #f0f0f0', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {payload[0].value === 100 ? payload[0].value.toFixed(0) : payload[0].value.toFixed(2)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {data.originalMonth}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  const CustomDot = ({ cx = 0, cy = 0, index }: CustomDotProps) => {
    if (index === activePoint) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={8} fill="white" stroke={theme.palette.primary.main} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={4} fill={theme.palette.primary.main} />
        </g>
      );
    }
    return null;
  };

  const getYAxisDomain = (): [number, number] => {
    if (chartData.length === 0) return [98.5, 100];

    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const margin = (maxValue - minValue) * 0.1 || 0.5;
    return [Math.max(minValue - margin, 98), Math.min(maxValue + margin, 100)];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ p: 2, maxWidth: 900, margin: 'auto', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>

            <DatePicker
              label="Año"
              value={dayjs().year(selectedYear)}
              onChange={handleYearChange}
              views={['year']}
              minDate={dayjs().year(2024)}
              maxDate={dayjs().year(new Date().getFullYear())}
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined',
                  sx: {
                    minWidth: 120,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.dark,
                      },
                    },
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ height: 400, width: '90vh', mt: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartData.length > 0 ? (
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 12 }} 
                    padding={{ left: 20, right: 20 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    domain={getYAxisDomain()}
                    tick={{ fill: '#666' }} 
                    tickCount={8} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `${value === 100 ? value.toFixed(0) : value.toFixed(2)}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={3}
                    dot={{ fill: theme.palette.primary.main, strokeWidth: 0, r: 4 }}
                    activeDot={<CustomDot />}
                    connectNulls={false}
                  />
                </LineChart>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography variant="h6" color="text.secondary">
                    No hay datos disponibles para {selectedYear}
                  </Typography>
                </Box>
              )}
            </ResponsiveContainer>
          </Box>

          {chartData.length > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, display: 'flex', justifyContent:'space-evenly' }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Período:</strong> {chartData[0].name} - {chartData[chartData.length - 1].name} | 
                <strong> Promedio:</strong> {(chartData.reduce((acc, curr) => acc + curr.value, 0) / chartData.length).toFixed(4)}% | 
                <strong> Mín:</strong> {Math.min(...chartData.map(d => d.value)).toFixed(2)}% | 
                <strong> Máx:</strong> {Math.max(...chartData.map(d => d.value)).toFixed(2)}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default ChartOrder;
