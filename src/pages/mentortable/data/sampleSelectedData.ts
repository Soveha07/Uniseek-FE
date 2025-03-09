export interface SelectedMentee {
    no: number;
    name: string;
    sex: string;
    startDate: string;
    endDate: string;
    timeOfMeetings: number; // Planned meetings (1–10)
    actualTimeOfMeetings: number; // Actual meetings (1–10)
    reference: string;
  }
  
export const sampleSelectedData: SelectedMentee[] = [
{
    no: 1,
    name: 'Alice Johnson',
    sex: 'Female',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    timeOfMeetings: 1,
    actualTimeOfMeetings: 1,
    reference: 'Ref 1',
},
{
    no: 2,
    name: 'Bob Williams',
    sex: 'Male',
    startDate: '2025-04-05',
    endDate: '2025-05-05',
    timeOfMeetings: 2,
    actualTimeOfMeetings: 2,
    reference: 'Ref 2',
},
// Add more mentee rows as needed
];