/**
 * Algoritmo FCFS: Ejecuta los procesos en orden de llegada.
 * @param {Array} processes - Lista de procesos con {name, arrivalTime, burstTime}
 * @returns {Object} - Resultado con el orden de ejecución y tiempo promedio de espera
 */
export function fcfs(processes) {
    let time = 0;
    let totalWaitingTime = 0;
  
    // Ordena por tiempo de llegada
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  
    const schedule = sortedProcesses.map(proc => {
      const waitingTime = Math.max(0, time - proc.arrivalTime);
      totalWaitingTime += waitingTime;
      const start = time;
      time += proc.burstTime;
  
      return {
        name: proc.name,
        arrival: proc.arrivalTime,
        burst: proc.burstTime,
        start,
        end: time,
        waiting: waitingTime
      };
    });
  
    const avgWait = totalWaitingTime / processes.length;
  
    return {
      schedule,
      avgWait
    };
  }
  
  /**
   * Algoritmo SJF (No Apropiativo): Selecciona siempre el proceso más corto disponible.
   * @param {Array} processes - Lista de procesos con {name, arrivalTime, burstTime}
   * @returns {Object} - Resultado con el orden de ejecución y tiempo promedio de espera
   */
  export function sjf(processes) {
    let time = 0;
    let completed = 0;
    const n = processes.length;
    const queue = [];
    const copied = [...processes];
    const schedule = [];
  
    while (completed < n) {
      // Agrega procesos disponibles a la cola
      for (let i = 0; i < n; i++) {
        if (copied[i] && copied[i].arrivalTime <= time) {
          queue.push(copied[i]);
          copied[i] = null; 
        }
      }
  
      if (queue.length === 0) {
        time++;
        continue;
      }
  
      // Ordenar cola por duración SJF
      queue.sort((a, b) => a.burstTime - b.burstTime);
  
      const current = queue.shift();
      const waitingTime = time - current.arrivalTime;
  
      schedule.push({
        name: current.name,
        arrival: current.arrivalTime,
        burst: current.burstTime,
        start: time,
        end: time + current.burstTime,
        waiting: waitingTime
      });
  
      time += current.burstTime;
      completed++;
    }
  
    const totalWaitingTime = schedule.reduce((sum, p) => sum + p.waiting, 0);
    const avgWait = totalWaitingTime / n;
  
    return {
      schedule,
      avgWait
    };
  }