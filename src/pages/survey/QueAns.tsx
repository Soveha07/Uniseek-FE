import React from 'react';
// QueAns.tsx
// Define the question type
export interface Question {
  id: number;
  question: string;
  subQuestion: string;
  choices: string[];
  selectionType: 'single' | 'multiple';
  minSelections?: number;
  maxSelections?: number;
}

// Payload type for storing answers
export interface AnswerPayload {
  [questionId: number]: string | null;
}

// Export an array of questions for the survey
export const questions: Question[] = [
  {
    id: 1,
    question: '1. Education Background',
    subQuestion: 'What is your high school study track?',
    choices: [
      'Science (Real Science)',
      'Social Science',
      'Technical/Vocational',
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 2,
    question: '1. Education Background',
    subQuestion: 'Which subjects are your strongest?',
    choices: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Literature',
      'History',
      'Geography',
      'Economics',
    ],
    selectionType: 'multiple',
    minSelections: 2,
  },
  {
    id: 3,
    question: '1. Education Background',
    subQuestion: 'Do you take any extra course?',
    choices: [
      'Yes, I take additional courses in Real Science',
      'Yes, I take additional courses in Social Science',
      'Yes, I take both (Real and Social Science)',
      'No, I only followed the standard school curriculum',
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 4,
    question: '2. University Factors',
    subQuestion: 'What type of career are you aiming for in the future?',
    choices: [
      'Technology & IT',
      'Healthcare & Medicine',
      'Business & Finance',
      'Engineering & Science',
      'Creative & Design',
      'Education & Research',
      'Public Service & Law',
      'Hospitality & Tourism',
      'Media & Communication',
      'Sports & Fitness',
      'Agriculture & Environmental Careers',
      'Skilled Trades & Vocational Careers',
    ],
    selectionType: 'single',
    minSelections: 2,
  },
  {
    id: 5,
    question: '2. University Factors',
    subQuestion: 'What is your estimated budget for university tuition per year?',
    choices: [
      'Less than $500',
      '$500 - $1000',
      '$1000 - $2000',
      '$2000 - $3000',
      '$4000 - $5000',
      '$5000 - $6000',
      'More than $6000',
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 6,
    question: '2. University Factors',
    subQuestion: 'How important are scholarships in your university choice?',
    choices: [
      'So much',
      'Much',
      'Neutral',
      'Not much',
      'No'
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 7,
    question: '2. University Factors',
    subQuestion: 'How important is the availability of exchange programs in your university choice?',
    choices: [
      'So much',
      'Much',
      'Neutral',
      'Not much',
      'No'
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 8,
    question: '2. University Factors',
    subQuestion: 'Does the quality of facilities (e.g., cleanliness of toilets) matter in your university choice?',
    choices: [
      'So much',
      'Much',
      'Neutral',
      'Not much',
      'No'
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 9,
    question: '2. University Factors',
    subQuestion: 'How many hours do you aim to study with lecturers at university?',
    choices: [
      'Only a shift 3 or 4 hours',
      'Full-time 8 hours',
      'Flexibility of timetable'
    ],
    selectionType: 'single',
    minSelections: 1,
  },
  {
    id: 10,
    question: '2. University Factors',
    subQuestion: 'What class size do you prefer at university?',
    choices: [
      'Small class',
      'Flexible class (Depend on the study course)'
    ],
    selectionType: 'single',
    minSelections: 1,
  },
];