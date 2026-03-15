export type MessageType = 'contact' | 'career';
export type MessageStatus = 'new' | 'read' | 'replied';

export interface Message {
  id: string;
  type: MessageType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  extra?: {
    projectType?: string;
    budget?: string;
    position?: string;
    experience?: string;
    company?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
}

export interface DashboardStats {
  totalMessages: number;
  newMessages: number;
  contactMessages: number;
  careerMessages: number;
  repliedMessages: number;
  lastUpdated: string;
}
