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
  {
    id: "P003",
    name: "Robert Chen",
    sentence: "8 years",
    startDate: "2019-06-20",
    endDate: "2027-06-20",
    timeLeft: "3 years, 4 months",
    offense: "Armed robbery",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-18"
  },
  {
    id: "P004",
    name: "Sarah Johnson",
    sentence: "2 years",
    startDate: "2023-01-15",
    endDate: "2025-01-15",
    timeLeft: "10 months",
    offense: "Credit card fraud",
    riskLevel: "Low",
    supervisionLevel: "Minimum",
    lastCheckIn: "2024-03-19"
  },
  {
    id: "P005",
    name: "Michael Williams",
    sentence: "10 years",
    startDate: "2018-11-30",
    endDate: "2028-11-30",
    timeLeft: "4 years, 8 months",
    offense: "Aggravated assault",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-15"
  },
  {
    id: "P006",
    name: "Emily Brown",
    sentence: "4 years",
    startDate: "2021-08-12",
    endDate: "2025-08-12",
    timeLeft: "1 year, 5 months",
    offense: "Drug distribution",
    riskLevel: "Medium",
    supervisionLevel: "Medium",
    lastCheckIn: "2024-03-17"
  },
  {
    id: "P007",
    name: "David Martinez",
    sentence: "6 years",
    startDate: "2020-04-25",
    endDate: "2026-04-25",
    timeLeft: "2 years, 1 month",
    offense: "Burglary",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-10"
  },
  {
    id: "P008",
    name: "Lisa Anderson",
    sentence: "3 years",
    startDate: "2022-09-01",
    endDate: "2025-09-01",
    timeLeft: "1 year, 6 months",
    offense: "Identity theft",
    riskLevel: "Medium",
    supervisionLevel: "Medium",
    lastCheckIn: "2024-03-16"
  },
  {
    id: "P009",
    name: "James Wilson",
    sentence: "7 years",
    startDate: "2019-12-10",
    endDate: "2026-12-10",
    timeLeft: "2 years, 9 months",
    offense: "Armed robbery",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-18"
  },
  {
    id: "P010",
    name: "Amanda Taylor",
    sentence: "2 years",
    startDate: "2023-05-20",
    endDate: "2025-05-20",
    timeLeft: "1 year, 2 months",
    offense: "Cyber fraud",
    riskLevel: "Low",
    supervisionLevel: "Minimum",
    lastCheckIn: "2024-03-19"
  },
  {
    id: "P011",
    name: "Kevin Thompson",
    sentence: "5 years",
    startDate: "2021-03-15",
    endDate: "2026-03-15",
    timeLeft: "2 years",
    offense: "Aggravated assault",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-17"
  },
  {
    id: "P012",
    name: "Rachel Moore",
    sentence: "4 years",
    startDate: "2022-01-30",
    endDate: "2026-01-30",
    timeLeft: "1 year, 10 months",
    offense: "Drug trafficking",
    riskLevel: "High",
    supervisionLevel: "Maximum",
    lastCheckIn: "2024-03-15"
  }
]; 