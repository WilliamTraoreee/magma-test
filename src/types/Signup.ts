export interface Ambassador {
  organizationId: number;
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface SignUp {
  organizationName: string | null;
  website: string | null;
  logoUrl: string | null;
  ambassadors: Ambassador[];
}
