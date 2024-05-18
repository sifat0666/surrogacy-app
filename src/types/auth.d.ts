export interface AuthState {
  accessToken: string | null;
  user: any;
  isAuthenticated: boolean;
  role: string | null
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EmailCheck {
  email: string;
}

interface ChangePasswordCredentials {
  current_password: string;
  password: string;
  password_confirmation: string;
}

interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number | string;
  allowedCompany?: string[];
  companyName: string | null;
  companySize: string | null;
  country: string | null;
  companyNo: string | number;
  CompanyAddress: string;
  postalCode: string | number;
}

type LoginAction = PayloadAction<AuthState>;
