
export enum FitnessGoal {
  FAT_LOSS = 'Fat Loss',
  MUSCLE_GAIN = 'Muscle Gain',
  ENDURANCE = 'Endurance',
  GENERAL = 'General Fitness',
  MENTAL_HEALTH = 'Mental Health & Discipline'
}

export enum FitnessLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum LocationPreference {
  GYM = 'Gym',
  HOME = 'Home'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goals: FitnessGoal[];
  level: FitnessLevel;
  location: LocationPreference;
  conditions: string[];
  wants: string[];
  onboarded: boolean;
}

export interface ExerciseVariation {
  title: string;
  description: string;
}

export interface Exercise {
  name: string;
  reps?: string;
  sets?: number;
  duration?: string;
  notes?: string;
  description: string;
  variations?: ExerciseVariation[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

export interface DayWorkout {
  day: string;
  title: string;
  gymWorkout: Exercise[];
  homeWorkout: Exercise[];
  cardio: string;
  stretching: string;
  intensity: 1 | 2 | 3;
}

export interface CheckIn {
  date: string;
  energy: number;
  mood: number;
  stress: number;
  completed: boolean;
}

export interface AppState {
  profile: UserProfile | null;
  currentDay: number;
  checkIns: CheckIn[];
  streak: number;
}
