export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface LeadFormData {
  equipment: string[];
  startDate: string;
  duration: string;
  location: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  details?: string;
}

export interface Lead {
  id: string;
  equipment: string[];
  startDate: string;
  duration: string;
  location: string;
  budget: string;
  createdAt: string;
  status: 'open' | 'claimed' | 'archived';
}