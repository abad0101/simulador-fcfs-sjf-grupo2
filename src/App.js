import React, { useState } from 'react';
import './App.css';

// Componentes
import ResultsTable from './components/ResultsTable';
import GanttChart from './components/GanttChart';

// Funciones de algoritmos
import { fcfs, sjf } from './algorithms/scheduling';

function App() {
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({
    name: '',
    arrivalTime: '',
    burstTime: ''
  });
  const [results, setResults] = useState(null);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProcess(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar proceso con validación
  const addProcess = () => {
    const { name, arrivalTime, burstTime } = newProcess;

    if (!name.trim()) {
      alert('El nombre del proceso es obligatorio.');
      return;
    }

    if (isNaN(arrivalTime) || parseInt(arrivalTime) < 0) {
      alert('El tiempo de llegada debe ser un número entero no negativo.');
      return;
    }

    if (isNaN(burstTime) || parseInt(burstTime) <= 0) {
      alert('La duración debe ser un número entero positivo.');
      return;
    }

    setProcesses([
      ...processes,
      {
        id: Date.now(), // ID único para identificar cada proceso
        name,
        arrivalTime: parseInt(arrivalTime),
        burstTime: parseInt(burstTime)
      }
    ]);

    setNewProcess({ name: '', arrivalTime: '', burstTime: '' });
  };

  // Editar un proceso existente
  const handleEdit = (id, field, value) => {
    const updatedProcesses = processes.map(proc =>
      proc.id === id ? { ...proc, [field]: value } : proc
    );
    setProcesses(updatedProcesses);
  };

  // Eliminar un proceso por ID
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proceso?')) {
      const updatedProcesses = processes.filter(proc => proc.id !== id);
      setProcesses(updatedProcesses);
    }
  };

  // Ejecutar ambos algoritmos
  const runAlgorithms = () => {
    const fcfsResult = fcfs([...processes]);
    const sjfResult = sjf([...processes]);
    setResults({ fcfs: fcfsResult, sjf: sjfResult });
  };

  // Reiniciar todo el formulario y resultados
  const resetForm = () => {
    setProcesses([]);
    setResults(null);
    setNewProcess({ name: '', arrivalTime: '', burstTime: '' });
  };

  return (
    <div className="App">
      <h1>Simulador de Planificación: FCFS vs SJF</h1>
      <h2>Grupo #2 | 723 Sistemas Operativos I</h2>

      {/* Formulario para agregar nuevo proceso */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Agregar Proceso</h3>
        <input
          placeholder="Nombre"
          name="name"
          value={newProcess.name}
          onChange={handleInputChange}
        />
        <input
          placeholder="Tiempo de llegada"
          name="arrivalTime"
          value={newProcess.arrivalTime}
          onChange={handleInputChange}
        />
        <input
          placeholder="Duración"
          name="burstTime"
          value={newProcess.burstTime}
          onChange={handleInputChange}
        />
        <button onClick={addProcess}>Agregar</button>
      </div>

      {/* Tabla de procesos agregados */}
      {processes.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Procesos Agregados</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '10px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Llegada</th>
                <th style={styles.th}>Duración</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((proc) => (
                <tr key={proc.id}>
                  <td style={styles.td}>
                    <input
                      type="text"
                      value={proc.name}
                      onChange={(e) => handleEdit(proc.id, 'name', e.target.value)}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      min="0"
                      value={proc.arrivalTime}
                      onChange={(e) => handleEdit(proc.id, 'arrivalTime', parseInt(e.target.value))}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      min="1"
                      value={proc.burstTime}
                      onChange={(e) => handleEdit(proc.id, 'burstTime', parseInt(e.target.value))}
                    />
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(proc.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '18px',
                        color: '#e74c3c'
                      }}
                      title="Eliminar proceso"
                    >
                      &#128465; {/* Icono de basura */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botones de acción */}
      <button onClick={runAlgorithms} disabled={processes.length === 0}>
        Ejecutar Algoritmos
      </button>
      <button
        onClick={resetForm}
        style={{
          marginLeft: '10px',
          backgroundColor: '#e74c3c',
          borderColor: '#c0392b',
          color: 'white'
        }}
      >
        Reiniciar
      </button>

      {/* Resultados */}
      {results && (
        <div>
          <h3>Resultados</h3>
          <ResultsTable title="FCFS" data={results.fcfs} />
          <ResultsTable title="SJF" data={results.sjf} />

          <h3>Gráficos de Gantt</h3>
          <GanttChart data={results.fcfs} title="FCFS" />
          <GanttChart data={results.sjf} title="SJF" />
        </div>
      )}
    </div>
  );
}

// Estilos inline para la tabla
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

export default App;