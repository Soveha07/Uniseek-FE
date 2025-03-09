export interface DataRow {
    no: number;
    name: string;
    sex: string;
    bookingDate: string;
    time: string;
    profile: string;
    status: 'Pending' | 'Accepted' | 'Declined';
}

export const sampleData: DataRow[] = [
    { no: 1, name: 'John Doe', sex: 'Male', bookingDate: '2025-03-01', time: "7:00 AM",profile: 'Profile 1', status: 'Pending' },
    { no: 2, name: 'Jane Smith', sex: 'Female', bookingDate: '2025-03-02', time: "3:00 PM",profile: 'Profile 2', status: 'Pending' },
    // Add more rows as needed
];