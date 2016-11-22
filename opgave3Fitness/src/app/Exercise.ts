// signup.interface.ts
export class Exercise {
  exerciseName: string;
  exerciseDescription: string;
  exerciseReps: number;
  exerciseSets: number;
  exerciseRepType: string;
}

export class Workout {
  workoutName: string;
  workoutAuthor: string;
  exercises: Exercise[];



}
