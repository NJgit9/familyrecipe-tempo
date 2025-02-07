export interface UserMetadata {
  username: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  terms_accepted?: boolean;
  privacy_accepted?: boolean;
}

export interface Family {
  id: string;
  name: string;
  code: string;
  created_at: string;
  created_by: string;
}

export interface UserFamily {
  user_id: string;
  family_id: string;
  role: "admin" | "member";
  joined_at: string;
}
