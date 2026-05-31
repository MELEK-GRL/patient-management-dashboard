export interface Patient {
    id: string;
    fullName: string;
    birthDate: string;
    appointmentDate: string;
    createdAt: string;
    department: string;
    status: string;
    priority: string;
    bloodType: string;
    score: number;
    note_tr: string;
    note_en: string;
    diagnosis_tr: string;
    diagnosis_en: string;
    isInsured: boolean;
    isFollowUp: boolean;
    isVaccinated: boolean;
    tags: string[];
    notes: string | null;
  }