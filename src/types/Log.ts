export type Log = {
    log_id: number;
    service_req_id: number;
    log_time: string;  // A data no formato ISO, você pode usar Date se precisar manipular a data.
    log_type: string;
    log_description: string;
    user_name: string;
  };