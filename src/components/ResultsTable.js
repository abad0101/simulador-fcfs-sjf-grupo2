import React from 'react';

/**
 * Componente para mostrar los resultados de un algoritmo de planificación.
 * @param {Object} props
 * @param {string} props.title - Título del algoritmo ("FCFS", "SJF")
 * @param {Object} props.data - Datos del resultado: { schedule, avgWait }
 */
const ResultsTable = ({ title, data }) => {
  return (
    <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h4>{title}</h4>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '10px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={styles.th}>Proceso</th>
            <th style={styles.th}>Llegada</th>
            <th style={styles.th}>Inicio</th>
            <th style={styles.th}>Fin</th>
            <th style={styles.th}>Duración</th>
            <th style={styles.th}>Espera</th>
          </tr>
        </thead>
        <tbody>
          {data.schedule.map((p, index) => (
            <tr key={index}>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.arrival}</td>
              <td style={styles.td}>{p.start}</td>
              <td style={styles.td}>{p.end}</td>
              <td style={styles.td}>{p.burst}</td>
              <td style={styles.td}>{p.waiting}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Promedio de espera:</strong> {data.avgWait.toFixed(2)}</p>
    </div>
  );
};

// Estilos básicos para la tabla
const styles = {
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  },
  td: {
    border: '1px solid #ddd',
    padding: '6px'
  }
};

export default ResultsTable;