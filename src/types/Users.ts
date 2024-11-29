export interface Users {
    id?: number;
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
    attendant?: boolean;
    admin?: boolean;
    email?: string;
    phone?: string;
    cell_phone?: string;
    complete_user_name?: string | null;
}