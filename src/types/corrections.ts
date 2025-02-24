export interface Parolee {
  id: string;
  name: string;
  sentence: string;
  startDate: string;
  endDate: string;
  timeLeft: string;
  offense: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  supervisionLevel: 'Minimum' | 'Medium' | 'Maximum';
  lastCheckIn: string;
}

export const mockParolees: Parolee[] = [
  {
    id: "P001",
    name: "John Smith",
    sentence: "5 years",
    startDate: "2020-03-15",
    endDate: "2025-03-15",
    timeLeft: "1 year, 3 months",
    offense: "Non-violent drug possession",
    riskLevel: "Low",
    supervisionLevel: "Minimum",
    lastCheckIn: "2024-02-15"
  },
  {
    id: "P002",
    name: "Maria Garcia",
    sentence: "3 years",
    startDate: "2022-01-10",
    endDate: "2025-01-10",
    timeLeft: "9 months",
    offense: "Theft under $5000",
    riskLevel: "Medium",
    supervisionLevel: "Medium",
    lastCheckIn: "2024-02-14"
  },
  // Add more mock data as needed
]; 