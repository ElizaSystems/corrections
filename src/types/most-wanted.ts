export interface MostWanted {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  lastSeen: string;
  location: string;
  charges: string[];
  dangerLevel: 'Extreme' | 'High' | 'Medium';
  reward: string;
  description: string;
  status: 'Active' | 'Captured' | 'Deceased';
}

export const mockMostWanted: MostWanted[] = [
  {
    id: "MW001",
    name: "Victor Rodriguez",
    age: 35,
    height: "6'2\"",
    weight: "190 lbs",
    lastSeen: "2024-01-15",
    location: "Miami, Florida",
    charges: ["Murder", "Armed Robbery", "Escape from Custody"],
    dangerLevel: "Extreme",
    reward: "$100,000",
    description: "Multiple tattoos including dragon on neck. Speaks English and Spanish. Known to use aliases.",
    status: "Active"
  },
  {
    id: "MW002",
    name: "Katherine Mills",
    age: 29,
    height: "5'7\"",
    weight: "135 lbs",
    lastSeen: "2024-02-20",
    location: "Portland, Oregon",
    charges: ["Drug Trafficking", "Money Laundering"],
    dangerLevel: "High",
    reward: "$50,000",
    description: "Distinctive scar on left cheek. Expert in identity theft and cybercrime.",
    status: "Active"
  },
  {
    id: "MW003",
    name: "Marcus Johnson",
    age: 42,
    height: "5'11\"",
    weight: "210 lbs",
    lastSeen: "2024-03-01",
    location: "Chicago, Illinois",
    charges: ["Human Trafficking", "Organized Crime", "Extortion"],
    dangerLevel: "Extreme",
    reward: "$150,000",
    description: "Known gang affiliations. Multiple surgical scars from gunshot wounds.",
    status: "Active"
  },
  {
    id: "MW004",
    name: "Alexander White",
    age: 38,
    height: "6'0\"",
    weight: "175 lbs",
    lastSeen: "2024-02-10",
    location: "Las Vegas, Nevada",
    charges: ["Serial Bank Robbery", "Assault with Deadly Weapon"],
    dangerLevel: "High",
    reward: "$75,000",
    description: "Multiple distinctive tattoos on arms. Expert in disguise and impersonation.",
    status: "Active"
  },
  {
    id: "MW005",
    name: "Isabella Romano",
    age: 31,
    height: "5'6\"",
    weight: "125 lbs",
    lastSeen: "2024-01-30",
    location: "Boston, Massachusetts",
    charges: ["International Drug Trafficking", "Murder"],
    dangerLevel: "Extreme",
    reward: "$200,000",
    description: "Known connections to international crime syndicates. Fluent in five languages.",
    status: "Active"
  },
  {
    id: "MW006",
    name: "Raymond Chang",
    age: 45,
    height: "5'10\"",
    weight: "170 lbs",
    lastSeen: "2024-02-15",
    location: "San Francisco, California",
    charges: ["Cybercrime", "Corporate Espionage", "Wire Fraud"],
    dangerLevel: "Medium",
    reward: "$40,000",
    description: "Technology expert. Known for sophisticated financial crimes.",
    status: "Active"
  },
  {
    id: "MW007",
    name: "Sofia Mendez",
    age: 33,
    height: "5'8\"",
    weight: "140 lbs",
    lastSeen: "2024-03-05",
    location: "Phoenix, Arizona",
    charges: ["Murder", "Identity Theft"],
    dangerLevel: "High",
    reward: "$80,000",
    description: "Master of disguise. Known to use multiple identities.",
    status: "Active"
  },
  {
    id: "MW008",
    name: "James O'Connor",
    age: 40,
    height: "6'1\"",
    weight: "200 lbs",
    lastSeen: "2024-02-28",
    location: "Seattle, Washington",
    charges: ["Serial Killing", "Kidnapping"],
    dangerLevel: "Extreme",
    reward: "$250,000",
    description: "Military trained. Extremely dangerous. Known survivalist.",
    status: "Active"
  },
  {
    id: "MW009",
    name: "Elena Popov",
    age: 36,
    height: "5'9\"",
    weight: "145 lbs",
    lastSeen: "2024-01-20",
    location: "New York City, New York",
    charges: ["International Money Laundering", "Organized Crime"],
    dangerLevel: "High",
    reward: "$120,000",
    description: "Expert in financial crimes. Known connections to Eastern European crime syndicates.",
    status: "Active"
  },
  {
    id: "MW010",
    name: "Trevor Barnes",
    age: 34,
    height: "6'3\"",
    weight: "220 lbs",
    lastSeen: "2024-03-10",
    location: "Denver, Colorado",
    charges: ["Armed Robbery", "Police Officer Murder"],
    dangerLevel: "Extreme",
    reward: "$180,000",
    description: "Former military special forces. Tactical expertise. Multiple weapon proficiencies.",
    status: "Active"
  },
  {
    id: "MW011",
    name: "Lucia Reyes",
    age: 28,
    height: "5'5\"",
    weight: "120 lbs",
    lastSeen: "2024-02-25",
    location: "Houston, Texas",
    charges: ["Human Trafficking", "Drug Distribution"],
    dangerLevel: "High",
    reward: "$90,000",
    description: "Known for sophisticated smuggling operations. Multiple cartel connections.",
    status: "Active"
  },
  {
    id: "MW012",
    name: "Daniel Kim",
    age: 39,
    height: "5'11\"",
    weight: "165 lbs",
    lastSeen: "2024-03-15",
    location: "Los Angeles, California",
    charges: ["International Art Theft", "Museum Heists"],
    dangerLevel: "Medium",
    reward: "$60,000",
    description: "Art expert. Known for elaborate heists and forgery.",
    status: "Active"
  },
  {
    id: "MW013",
    name: "Mohammed Al-Rashid",
    age: 41,
    height: "6'0\"",
    weight: "180 lbs",
    lastSeen: "2024-03-08",
    location: "Detroit, Michigan",
    charges: ["Terrorism", "Weapons Trafficking"],
    dangerLevel: "Extreme",
    reward: "$500,000",
    description: "International terrorist connections. Expert in explosives.",
    status: "Active"
  }
]; 