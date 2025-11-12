// src/components/Passing/ExercisesSection.tsx
interface ExercisesSectionProps {
  exercises: string[][];
  progress: number[];
  updateProgress: (index: number, value: number) => void;
  onComplete: () => void;
}

export function ExercisesSection({ exercises, progress }: ExercisesSectionProps) {
  return (
    <section className="exercises-section">
      <h2 className="exercises-title">Упражнения</h2>
      <div className="exercises-grid">
        {[0, 1, 2].map((col) => (
          <div key={col} className="exercise-column">
            {exercises[col]?.map((exercise, row) => {
              const index = col + row * 3;
              const value = progress[index] || 0;
              return (
                <div key={index} className="exercise-item-wrapper">
                  <div className="exercise-item">
                    {exercise || 'Упражнение'}
                    <span className="progress-value">{value}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}