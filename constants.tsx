
import React from 'react';
import { 
  Flame, 
  Dumbbell, 
  Zap, 
  Brain, 
  Smile
} from 'lucide-react';
import { DayWorkout, FitnessGoal } from './types';

export const COLORS = {
  bg: '#0B0F14',
  primary: '#00FF99',
  secondary: '#8B5CF6',
  warning: '#F59E0B',
  text: '#E5E7EB',
  muted: '#9CA3AF'
};

export const GOALS_DATA = [
  { id: FitnessGoal.FAT_LOSS, icon: <Flame className="w-6 h-6" />, color: 'text-orange-500' },
  { id: FitnessGoal.MUSCLE_GAIN, icon: <Dumbbell className="w-6 h-6" />, color: 'text-red-500' },
  { id: FitnessGoal.ENDURANCE, icon: <Zap className="w-6 h-6" />, color: 'text-yellow-400' },
  { id: FitnessGoal.GENERAL, icon: <Smile className="w-6 h-6" />, color: 'text-green-400' },
  { id: FitnessGoal.MENTAL_HEALTH, icon: <Brain className="w-6 h-6" />, color: 'text-purple-400' },
];

export const WORKOUT_PLAN: DayWorkout[] = [
  {
    day: 'Monday',
    title: 'Chest Day',
    intensity: 2,
    gymWorkout: [
      { 
        name: 'Machine Chest Press', 
        sets: 4, 
        reps: '10-12', 
        description: 'Sit comfortably on the machine. Push the handles forward until arms are extended but not locked. Return slowly.',
        primaryMuscles: ['Chest'],
        secondaryMuscles: ['Triceps', 'Shoulders'],
        variations: [
          { title: 'Dumbbell Press', description: 'Use free weights for more stabilizer engagement.' },
          { title: 'Incline Press', description: 'Adjust bench to 30-45 degrees to target upper chest.' }
        ]
      },
      { 
        name: 'Cable Pec Fly', 
        sets: 3, 
        reps: '12-15', 
        description: 'Grip cable handles with elbows slightly bent. Bring arms together in front of your chest. Squeeze and release slowly.',
        primaryMuscles: ['Chest'],
        secondaryMuscles: ['Shoulders'],
        variations: [
          { title: 'Dumbbell Fly', description: 'Perform on a flat bench with controlled descent.' },
          { title: 'Butterfly Machine', description: 'Use the seated machine for strict isolation.' }
        ]
      },
      { 
        name: 'Weighted Dips', 
        sets: 3, 
        reps: 'Until Failure', 
        description: 'Use parallel bars. Lower your body by bending elbows until upper arms are parallel to the floor. Push back up.',
        primaryMuscles: ['Chest', 'Triceps'],
        secondaryMuscles: ['Shoulders'],
        variations: [
          { title: 'Bodyweight Dips', description: 'Standard version if weights are too difficult.' },
          { title: 'Assisted Dip Machine', description: 'Use counterweight for higher repetition range.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Pushups (Standard)', 
        sets: 4, 
        reps: '12-15', 
        description: 'Keep back straight and core engaged. Lower chest to floor and push back up in a controlled motion.',
        primaryMuscles: ['Chest'],
        secondaryMuscles: ['Triceps', 'Shoulders', 'Core'],
        variations: [
          { title: 'Knee Pushups', description: 'Easier variation to build initial strength.' },
          { title: 'Decline Pushups', description: 'Elevate feet on a chair to target upper chest.' }
        ]
      },
      { 
        name: 'Floor Press', 
        sets: 3, 
        reps: '15', 
        description: 'Lie on back, press heavy household objects (water jugs) upwards as if bench pressing.',
        primaryMuscles: ['Chest'],
        secondaryMuscles: ['Triceps'],
        variations: [
          { title: 'Close-Grip Floor Press', description: 'Hands closer together to emphasize triceps.' },
          { title: 'Single-Arm Press', description: 'Focus on one side at a time for core stability.' }
        ]
      }
    ],
    cardio: 'Incline walk 15 min + Cross trainer 10 min',
    stretching: 'Neck, shoulders, chest, upper back'
  },
  {
    day: 'Tuesday',
    title: 'Back + Core',
    intensity: 3,
    gymWorkout: [
      { 
        name: 'Lat Pulldowns', 
        sets: 4, 
        reps: '10-12', 
        description: 'Pull the bar down toward your upper chest, squeezing shoulder blades together. Do not lean back excessively.',
        primaryMuscles: ['Back'],
        secondaryMuscles: ['Biceps', 'Shoulders'],
        variations: [
          { title: 'Pull-ups', description: 'The ultimate bodyweight back exercise.' },
          { title: 'Underhand Pulldowns', description: 'Focuses more on the biceps and lower lats.' }
        ]
      },
      { 
        name: 'Seated Cable Rows', 
        sets: 3, 
        reps: '12', 
        description: 'Pull handles toward your torso while keeping back straight. Focus on using your back muscles, not just arms.',
        primaryMuscles: ['Back'],
        secondaryMuscles: ['Biceps', 'Shoulders'],
        variations: [
          { title: 'One-Arm Dumbbell Row', description: 'Increases range of motion and isolates each side.' },
          { title: 'T-Bar Rows', description: 'Old school heavy lifting for back thickness.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Superman Extensions', 
        sets: 4, 
        reps: '15', 
        description: 'Lie face down. Lift arms and legs simultaneously off the floor. Hold for 2 seconds and lower.',
        primaryMuscles: ['Back'],
        secondaryMuscles: ['Glutes', 'Core'],
        variations: [
          { title: 'Aquaman Extensions', description: 'Opposite arm and opposite leg for better coordination.' },
          { title: 'W-Raises', description: 'Keep elbows bent at 90 degrees to target mid-back.' }
        ]
      },
      { 
        name: 'Doorway Rows', 
        sets: 3, 
        reps: '15', 
        description: 'Stand in a doorway. Grab the frame and lean back. Pull yourself forward using your back muscles.',
        primaryMuscles: ['Back'],
        secondaryMuscles: ['Biceps'],
        variations: [
          { title: 'Bed Sheet Rows', description: 'Tie a knot in a sheet and close it in a door to row.' },
          { title: 'Table Rows', description: 'Lie under a sturdy table and pull chest toward the underside.' }
        ]
      }
    ],
    cardio: 'Incline walk 15-20 min',
    stretching: 'Spine mobility, lower back, hips'
  },
  {
    day: 'Wednesday',
    title: 'Shoulders',
    intensity: 2,
    gymWorkout: [
      { 
        name: 'Overhead Barbell Press', 
        sets: 4, 
        reps: '10', 
        description: 'Press bar upward from shoulder level until arms are fully extended. Lower slowly.',
        primaryMuscles: ['Shoulders'],
        secondaryMuscles: ['Triceps'],
        variations: [
          { title: 'Dumbbell Press', description: 'Easier on the joints and improves stability.' },
          { title: 'Arnold Press', description: 'Rotate palms during press to hit all heads.' }
        ]
      },
      { 
        name: 'Dumbbell Lateral Raises', 
        sets: 3, 
        reps: '15', 
        description: 'Lift dumbbells out to the sides with slightly bent elbows until they reach shoulder height.',
        primaryMuscles: ['Shoulders'],
        secondaryMuscles: ['Upper Back'],
        variations: [
          { title: 'Cable Lateral Raise', description: 'Constant tension throughout the movement.' },
          { title: 'Seated Lateral Raise', description: 'Eliminates cheating or body swing.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Pike Pushups', 
        sets: 3, 
        reps: '8-10', 
        description: 'Form an inverted V with your body. Lower your head towards the floor and push back up.',
        primaryMuscles: ['Shoulders'],
        secondaryMuscles: ['Triceps', 'Chest'],
        variations: [
          { title: 'Dive Bomber Pushups', description: 'Swooping motion for chest and shoulders.' },
          { title: 'Elevated Pike Pushups', description: 'Feet on a chair for increased load.' }
        ]
      },
      { 
        name: 'Y-W-T Holds', 
        sets: 3, 
        duration: '45s each', 
        description: 'Hold arms in Y, W, and T positions while lying face down to build shoulder health.',
        primaryMuscles: ['Shoulders'],
        secondaryMuscles: ['Upper Back'],
        variations: [
          { title: 'Wall Slides', description: 'Back against wall, slide arms up and down.' },
          { title: 'Scapular Squeezes', description: 'Focus purely on blade movement.' }
        ]
      }
    ],
    cardio: 'Cross trainer 10-12 min + Flat walk 10 min',
    stretching: 'Neck, shoulders, chest opening'
  },
  {
    day: 'Thursday',
    title: 'Biceps Focus',
    intensity: 1,
    gymWorkout: [
      { 
        name: 'EZ-Bar Curls', 
        sets: 4, 
        reps: '10-12', 
        description: 'Curl the bar toward shoulders. Keep elbows pinned to your sides. Squeeze at the top.',
        primaryMuscles: ['Biceps'],
        secondaryMuscles: ['Forearms'],
        variations: [
          { title: 'Preacher Curls', description: 'Rest arms on pad to eliminate momentum.' },
          { title: 'Cable Curls', description: 'Maintains tension at the very top of the rep.' }
        ]
      },
      { 
        name: 'Dumbbell Hammer Curls', 
        sets: 3, 
        reps: '12', 
        description: 'Hold dumbbells with palms facing each other. Curl toward shoulders.',
        primaryMuscles: ['Biceps'],
        secondaryMuscles: ['Forearms'],
        variations: [
          { title: 'Rope Hammer Curls', description: 'Using cables for a constant resistance profile.' },
          { title: 'Cross-Body Hammers', description: 'Curl toward the opposite shoulder for forearm emphasis.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Water Jug Curls', 
        sets: 4, 
        reps: '15', 
        description: 'Use handles of water jugs or heavy books. Control the speed on the way down.',
        primaryMuscles: ['Biceps'],
        secondaryMuscles: ['Forearms'],
        variations: [
          { title: 'Backpack Curls', description: 'Fill a bag with books for adjustable weight.' },
          { title: 'Static Holds', description: 'Hold at 90 degrees for as long as possible.' }
        ]
      }
    ],
    cardio: 'Incline walk 15 min',
    stretching: 'Upper back, arms, gentle spine'
  },
  {
    day: 'Friday',
    title: 'Triceps Focus',
    intensity: 1,
    gymWorkout: [
      { 
        name: 'Cable Tricep Pushdowns', 
        sets: 4, 
        reps: '12', 
        description: 'Push the bar down until arms are fully extended. Keep elbows locked at your sides.',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Shoulders'],
        variations: [
          { title: 'Rope Pushdowns', description: 'Allows you to pull hands apart for better contraction.' },
          { title: 'Reverse Grip Pushdowns', description: 'Targets the long head of the tricep.' }
        ]
      },
      { 
        name: 'Skull Crushers', 
        sets: 3, 
        reps: '10', 
        description: 'Lie on a bench. Lower EZ-bar toward forehead by bending elbows. Extend back up.',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Shoulders'],
        variations: [
          { title: 'Dumbbell Overhead Extension', description: 'Can be done seated or standing.' },
          { title: 'Tricep Kickbacks', description: 'Focus on the full extension and squeeze.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Tricep Bench Dips', 
        sets: 4, 
        reps: '12', 
        description: 'Use a sturdy chair or sofa. Lower hips by bending elbows. Push back up.',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Chest', 'Shoulders'],
        variations: [
          { title: 'Feet-Elevated Dips', description: 'Increase the load by placing feet on another chair.' },
          { title: 'One-Leg Dips', description: 'Adds balance and core requirement.' }
        ]
      },
      { 
        name: 'Diamond Pushups', 
        sets: 3, 
        reps: '10', 
        description: 'Hands together in a diamond shape. Focuses strictly on tricep lockout.',
        primaryMuscles: ['Triceps'],
        secondaryMuscles: ['Chest', 'Shoulders', 'Core'],
        variations: [
          { title: 'Cobra Pushups', description: 'Yoga-inspired move for triceps and lower back.' },
          { title: 'Incline Diamonds', description: 'Hands on a desk or table to make it easier.' }
        ]
      }
    ],
    cardio: 'Cross trainer 8-10 min + Flat walk 10 min',
    stretching: 'Hips, hamstrings, calves, ankles'
  },
  {
    day: 'Saturday',
    title: 'Legs Day',
    intensity: 3,
    gymWorkout: [
      { 
        name: 'Barbell Back Squats', 
        sets: 4, 
        reps: '10', 
        description: 'Lower hips as if sitting in a chair. Keep chest up and knees tracking over toes.',
        primaryMuscles: ['Quads', 'Glutes'],
        secondaryMuscles: ['Hamstrings', 'Core'],
        variations: [
          { title: 'Goblet Squats', description: 'Hold a dumbbell at chest height; great for beginners.' },
          { title: 'Front Squats', description: 'Targets quads more and forces upright posture.' }
        ]
      },
      { 
        name: 'Leg Press Machine', 
        sets: 3, 
        reps: '12', 
        description: 'Push the platform away using your heels. Do not lock your knees at the top.',
        primaryMuscles: ['Quads'],
        secondaryMuscles: ['Glutes', 'Hamstrings'],
        variations: [
          { title: 'Single Leg Press', description: 'Fixes muscular imbalances.' },
          { title: 'High Foot Placement', description: 'Shifts emphasis towards hamstrings and glutes.' }
        ]
      }
    ],
    homeWorkout: [
      { 
        name: 'Bodyweight Squats', 
        sets: 4, 
        reps: '20', 
        description: 'Stand with feet shoulder-width apart. Squat down until thighs are parallel to the floor.',
        primaryMuscles: ['Quads', 'Glutes'],
        secondaryMuscles: ['Hamstrings'],
        variations: [
          { title: 'Jump Squats', description: 'Explosive version for power and heart rate.' },
          { title: 'Bulgarian Split Squats', description: 'One foot behind on a chair; extremely effective.' }
        ]
      },
      { 
        name: 'Glute Bridges', 
        sets: 3, 
        reps: '20', 
        description: 'Lie on back with knees bent. Lift hips toward ceiling. Squeeze glutes at the top.',
        primaryMuscles: ['Glutes'],
        secondaryMuscles: ['Hamstrings', 'Core'],
        variations: [
          { title: 'Single-Leg Bridge', description: 'Significantly harder, isolates each glute.' },
          { title: 'Frog Pumps', description: 'Feet together, knees out to target outer glutes.' }
        ]
      }
    ],
    cardio: 'Flat walk 15-20 min (no incline)',
    stretching: 'Hips, hamstrings, calves, ankles (longer stretch)'
  },
  {
    day: 'Sunday',
    title: 'Rest & Recovery',
    intensity: 1,
    gymWorkout: [],
    homeWorkout: [],
    cardio: 'Easy walk 20-30 min',
    stretching: 'Full body gentle stretch + breathing'
  }
];
