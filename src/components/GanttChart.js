import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * Componente para mostrar gráfico de Gantt de un algoritmo de planificación.
 * @param {Object} props
 * @param {Array} props.data - Resultado del algoritmo (schedule)
 * @param {string} props.title - Título del gráfico (ej: "FCFS", "SJF")
 */
const GanttChart = ({ data, title }) => {
  // Transformar datos para Recharts
  const chartData = data.schedule.map(proc => ({
    name: proc.name,
    start: proc.start,
    duration: proc.end - proc.start,
    wait: proc.waiting
  }));

  return (
    <div style={{ width: '100%', height: 300, marginTop: 20 }}>
      <h4>{title}</h4>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" stackId="a" fill="#2196F3" name="Ejecución" />
          <Bar dataKey="wait" stackId="a" fill="#FF9800" name="Espera" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GanttChart;