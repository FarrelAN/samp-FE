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
  case_score: string;
  model_name: string;
  case_severity: string;
  impact_scope: string;
  data_source: string;
  created_at: string;
  resolution: string;
  PIC: {
    PIC_IAM: string;
    PIC_SOC: string;
  };
  associated_insight: string;
  highlight_information: string;
  technique: string;
  rules: string;
  ip_address: string;
  mac_address: string;
  timestamps: {
    open?: Date;
    in_progress?: Date;
    awaiting_review?: Date;
    closed?: Date;
  };
  no_waprib: number;
  job_level: string;
  logon_attempt: number;
  location: string;
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
export interface CaseStatusCounts {
  CLOSED: number;
  "ON PROGRESS": number;
  REVIEW: number;
  OPEN: number;
}

export interface CountryHeatmap {
  [key: string]: number;
}

export interface HighSeverityCases {
  highSeverityCount: number;
}

export interface JobLevelCounts {
  [key: string]: number;
}

export interface RegionCounts {
  [key: string]: number;
}

export interface JobLevelByRegion {
  [key: string]: {
    job_level: string;
    count: number;
  };
}

export interface DashboardData {
  caseStatusCounts: CaseStatusCounts;
  countryHeatmap: CountryHeatmap;
  highSeverityCases: HighSeverityCases[];
  incomingCases: number;
  jobLevelCounts: JobLevelCounts;
  regionCounts: RegionCounts;
  jobLevelByRegion: JobLevelByRegion;
  time_caseComplete: number;
  time_IAM: number;
  time_SOC: number;
}
