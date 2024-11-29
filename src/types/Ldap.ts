export type Ldap = {
    id?: number
    title: string;
    host: string;
    provider: number;
    port: number
    domain: string;
    auth_type: number;
    user: string;
    password: string;
    is_active: boolean;
    scan_schedule: boolean;
    import_groups: boolean;
    include_sub_ous: boolean;
    start_hour: Date;
    repeate_type: number;
    cycle: string;
    cache_password: boolean,
    filter_class: string;
    filer_user: string;
    cn_attribute: string;
    dn_attribute: string;
    name_attribute: string;
    dn_base: string;
    dn_login: string;
    open_ldap_atributo_state: string;
    open_ldap_atributo_state_du: string;
    created_by: string;
    modified_by: string;
    created_time: Date;
    modified_time: Date;
}

