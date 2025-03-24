interface Major {
    id: number;
    name: string;
}

interface University {
    id: number;
    name: string;
}

interface Mentor {
    id: number;
    fullName: string;
    description: string;
    profileUrl: string | null;
    email: string;
    phoneNumber: string;
    telegramLink: string;
    major: Major;
    university: University;
}

export interface Booking {
    id: number;
    day: string;
    time: string;
    mentor: Mentor;
    bookedAt: string; // Store the date of booking
    status: string;
}
