export interface Inmate {
  id: string;
  name: string;
  sentence: string;
  startDate: string;
  releaseDate: string;
  timeServed: string;
  offense: string;
  securityLevel: 'Minimum' | 'Medium' | 'Maximum';
  facility: string;
  behavior: 'Good' | 'Fair' | 'Poor';
  lastIncident?: string;
}

export const mockInmates: Inmate[] = [
  {
    id: "I001",
    name: "Michael Brown",
    sentence: "15 years",
    startDate: "2018-05-20",
    releaseDate: "2033-05-20",
    timeServed: "5 years, 10 months",
    offense: "Armed robbery",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Good"
  },
  {
    id: "I002",
    name: "David Martinez",
    sentence: "8 years",
    startDate: "2020-03-15",
    releaseDate: "2028-03-15",
    timeServed: "4 years",
    offense: "Drug trafficking",
    securityLevel: "Medium",
    facility: "Central Prison",
    behavior: "Fair",
    lastIncident: "2023-11-15"
  },
  {
    id: "I003",
    name: "Emily White",
    sentence: "12 years",
    startDate: "2019-08-10",
    releaseDate: "2031-08-10",
    timeServed: "4 years, 7 months",
    offense: "Aggravated assault",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Poor",
    lastIncident: "2024-02-20"
  },
  {
    id: "I004",
    name: "Thomas Wilson",
    sentence: "5 years",
    startDate: "2021-12-05",
    releaseDate: "2026-12-05",
    timeServed: "2 years, 3 months",
    offense: "Grand theft",
    securityLevel: "Minimum",
    facility: "Minimum Security Facility",
    behavior: "Good"
  },
  {
    id: "I005",
    name: "Jessica Lee",
    sentence: "10 years",
    startDate: "2020-06-30",
    releaseDate: "2030-06-30",
    timeServed: "3 years, 9 months",
    offense: "Manslaughter",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Fair",
    lastIncident: "2023-09-10"
  },
  {
    id: "I006",
    name: "Robert Anderson",
    sentence: "20 years",
    startDate: "2017-08-15",
    releaseDate: "2037-08-15",
    timeServed: "6 years, 7 months",
    offense: "Second-degree murder",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Fair",
    lastIncident: "2023-12-05"
  },
  {
    id: "I007",
    name: "Sarah Parker",
    sentence: "6 years",
    startDate: "2021-03-10",
    releaseDate: "2027-03-10",
    timeServed: "3 years",
    offense: "Embezzlement",
    securityLevel: "Minimum",
    facility: "Minimum Security Facility",
    behavior: "Good"
  },
  {
    id: "I008",
    name: "Carlos Rodriguez",
    sentence: "25 years",
    startDate: "2015-11-20",
    releaseDate: "2040-11-20",
    timeServed: "8 years, 4 months",
    offense: "First-degree murder",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Poor",
    lastIncident: "2024-01-15"
  },
  {
    id: "I009",
    name: "Linda Chen",
    sentence: "4 years",
    startDate: "2022-06-05",
    releaseDate: "2026-06-05",
    timeServed: "1 year, 9 months",
    offense: "Credit card fraud",
    securityLevel: "Minimum",
    facility: "Minimum Security Facility",
    behavior: "Good"
  },
  {
    id: "I010",
    name: "William Turner",
    sentence: "12 years",
    startDate: "2019-04-30",
    releaseDate: "2031-04-30",
    timeServed: "4 years, 11 months",
    offense: "Armed assault",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Fair",
    lastIncident: "2023-10-20"
  },
  {
    id: "I011",
    name: "Patricia Wong",
    sentence: "7 years",
    startDate: "2020-09-15",
    releaseDate: "2027-09-15",
    timeServed: "3 years, 6 months",
    offense: "Drug manufacturing",
    securityLevel: "Medium",
    facility: "Central Prison",
    behavior: "Good"
  },
  {
    id: "I012",
    name: "Derek Foster",
    sentence: "10 years",
    startDate: "2019-12-01",
    releaseDate: "2029-12-01",
    timeServed: "4 years, 3 months",
    offense: "Aggravated robbery",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Poor",
    lastIncident: "2024-02-28"
  },
  {
    id: "I013",
    name: "Maria Sanchez",
    sentence: "5 years",
    startDate: "2021-07-20",
    releaseDate: "2026-07-20",
    timeServed: "2 years, 8 months",
    offense: "Identity theft",
    securityLevel: "Medium",
    facility: "Central Prison",
    behavior: "Fair"
  },
  {
    id: "I014",
    name: "Anthony Harris",
    sentence: "15 years",
    startDate: "2018-03-10",
    releaseDate: "2033-03-10",
    timeServed: "6 years",
    offense: "Attempted murder",
    securityLevel: "Maximum",
    facility: "State Correctional Institution",
    behavior: "Fair",
    lastIncident: "2023-11-30"
  },
  {
    id: "I015",
    name: "Jennifer Kim",
    sentence: "3 years",
    startDate: "2022-11-15",
    releaseDate: "2025-11-15",
    timeServed: "1 year, 4 months",
    offense: "Cyber fraud",
    securityLevel: "Minimum",
    facility: "Minimum Security Facility",
    behavior: "Good"
  }
]; 