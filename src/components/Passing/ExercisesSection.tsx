// src/components/Passing/ExercisesSection.tsx
interface ExercisesSectionProps {
  exercises: string[][];
  progress: number[];
  updateProgress: (index: number, value: number) => void;
}

export function ExercisesSection({ exercises, progress, updateProgress }: ExercisesSectionProps) {
  const getProgressForIndex = (col: number, row: number) => {
    const index = col + row * 3;
    return progress[index] || 0;
  };

  return (
    <section className="exercises-section">
      <h2 className="exercises-title">Упражнения</h2>
      <div className="exercises-grid">
        {[0, 1, 2].map((col) => (
          <div key={col} className="exercise-column">
            {exercises[col]?.map((exerciseText, row) => {
              const index = col + row * 3;
              const value = getProgressForIndex(col, row);
              return (
                <div key={index} className="exercise-item-wrapper">
                  <div className="exercise-item">
                    {exerciseText} <span className="progress-value">{value}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${value}%` }} />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={e => updateProgress(index, Number(e.target.value))}
                    className="progress-slider visually-hidden"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}