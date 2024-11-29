export type Attributes = {
    id: number;
    ldap_field: string;
    system_field: string;
    created_by: string;
    modified_by: string;
    created_time: string; // ou Date, dependendo de como você deseja manipular as datas
    modified_time: string; // ou Date
    cldap: number;
  };