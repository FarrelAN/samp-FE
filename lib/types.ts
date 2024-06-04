export type RuleSetType = {
  risk_factor: string;
  risk_event: string;
  most_impacted_assets: number;
  real_time_score: number;
  remediation: string;
};

export type CaseType = {
  _id: string;
  case_status: string;
  case_score: {
    type: String;
  };
  model_name: string;
  case_severity: string;
  impact_scope: string;
  data_processor: string;
  created_at: string;
  finding: string;
  case: string;
  owners: string;
  associated_insight: string;
  highlight_information: string;
  technique: string;
  rules: string;
  ip_address: string;
  mac_address: string;
};

export type ResponseType = {
  _id: string;
  nama_lengkap: string;
  user_ad: string;
  email: string;
  no_wa: string;
  departemen_tim: string;
  id_kasus: string;
  deskripsi_aktivitas: string;
  mengetahui_aktivitas: string;
  membagikan_info_login: string;
  menggunakan_vpn: string;
  membuka_tautan_mencurigakan: string;
};
