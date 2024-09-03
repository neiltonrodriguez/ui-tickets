export interface iResponseLogin {
    access_token: string;
    usuario: User;
  }
  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_id: number;
    instrument: string;
    is_active: number;
    created_at?: any;
    updated_at?: any;
  }