export interface Question {
    id: number;
    text: string;
    choices: string[];
    type: 'single' | 'multiple';
    minSelections?: number;
    maxSelections?: number;
}