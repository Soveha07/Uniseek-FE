// university.interface.ts
export interface CareerField {
    id: number;
    name: string;
}

export interface University {
    id: number;
    name: string;
    location: string;
    description: string;
    totalEnrollment: number;
    minPrice: string;
    maxPrice: string;
    universityType: string;
    classSize?: string;
    scholarship?: string;
    exchange?: string;
    facility?: string;
    shift?: string;
    createdAt?: string;
    photoUrl?: string | null;
    universityCareerfields: CareerField[];
    score?: number;
}
