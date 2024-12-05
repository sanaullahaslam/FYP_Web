export interface User {
  id: string;
  name: string;
  email: string;
  role: 'dermatologist' | 'researcher' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ScanResult {
  id: string;
  imageUrl: string;
  diagnosis: string;
  confidenceScore: number;
  uploadDate: string;
  userId: string;
}