import { ProjectLHPType } from "@/lib/type";

// Example projects data of type ProjectLHPType[]
const exampleProjectsData: ProjectLHPType[] = [
  {
    _id: "1",
    case_id: "WB-9740-20240430-00003",
    case_name:
      "WB-9740-20240430-00003 (Potential Impersonation Attempt - Impossible Travel)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 07:34:24",
    case_status: "Open",
  },
  {
    _id: "2",
    case_id: "WB-9740-20240430-00004",
    case_name:
      "WB-9740-20240430-00004 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 07:46:14",
    case_status: "On Progress",
  },
  {
    _id: "3",
    case_id: "WB-9740-20240430-00008",
    case_name:
      "WB-9740-20240430-00008 (Potential Impersonation Attempt - Atypical Travel)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 11:21:43",
    case_status: "Closed",
  },
  {
    _id: "4",
    case_id: "WB-9740-20240430-00009",
    case_name:
      "WB-9740-20240430-00009 (Potential Impersonation Attempt - Impossible Travel)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 12:00:04",
    case_status: "On Progress",
  },
  {
    _id: "5",
    case_id: "WB-9740-20240430-00012",
    case_name:
      "WB-9740-20240430-00012 (Potential Impersonation Attempt - Impossible Travel)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 12:02:05",
    case_status: "Open",
  },
  {
    _id: "6",
    case_id: "WB-9740-20240430-00014",
    case_name:
      "WB-9740-20240430-00014 (Microsoft Entra ID Identity Protection Risk Detection - Anonymous IP Address)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 16:22:11",
    case_status: "Closed",
  },
  {
    _id: "7",
    case_id: "WB-9740-20240430-00015",
    case_name:
      "WB-9740-20240430-00015 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 19:12:07",
    case_status: "On Progress",
  },
  {
    _id: "8",
    case_id: "WB-9740-20240501-00003",
    case_name: "WB-9740-20240501-00003 (Leaked Account Identification)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 03:14:38",
    case_status: "Closed",
  },
  {
    _id: "9",
    case_id: "WB-9740-20240501-00004",
    case_name:
      "WB-9740-20240501-00004 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 05:00:09",
    case_status: "Open",
  },
  {
    _id: "10",
    case_id: "WB-9740-20240501-00005",
    case_name:
      "WB-9740-20240501-00005 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 07:42:19",
    case_status: "On Progress",
  },
  {
    _id: "11",
    case_id: "WB-9740-20240501-00007",
    case_name:
      "WB-9740-20240501-00007 (Microsoft Entra ID Identity Protection Risk Detection - Unfamiliar Sign-in Properties)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 13:00:41",
    case_status: "Closed",
  },
  {
    _id: "12",
    case_id: "WB-9740-20240501-00009",
    case_name:
      "WB-9740-20240501-00009 (Potential Bruteforce Attack - Sensitive App Target)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 17:50:12",
    case_status: "Open",
  },
  {
    _id: "13",
    case_id: "WB-9740-20240501-00010",
    case_name:
      "WB-9740-20240501-00010 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 19:30:53",
    case_status: "On Progress",
  },
  {
    _id: "14",
    case_id: "WB-9740-20240501-00011",
    case_name:
      "WB-9740-20240501-00011 (Potential Impersonation Attempt - Sudden Appearance)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-01 22:31:34",
    case_status: "Closed",
  },
  {
    _id: "15",
    case_id: "WB-9740-20240502-00001",
    case_name:
      "WB-9740-20240502-00001 (Potential BruteForce Attack - Password Spraying)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 02:00:15",
    case_status: "Open",
  },
  {
    _id: "16",
    case_id: "WB-9740-20240502-00002",
    case_name:
      "WB-9740-20240502-00002 (Potential Bruteforce Attack - Sensitive App Target)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 04:46:46",
    case_status: "Closed",
  },
  {
    _id: "17",
    case_id: "WB-9740-20240502-00003",
    case_name:
      "WB-9740-20240502-00003 (Potential Impersonation Attempt - Sudden Appearance)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 08:04:07",
    case_status: "On Progress",
  },
  {
    _id: "18",
    case_id: "WB-9740-20240502-00004",
    case_name:
      "WB-9740-20240502-00004 (Microsoft Entra ID Identity Protection Risk Detection - Unfamiliar Sign-in Properties)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 08:32:18",
    case_status: "Closed",
  },
  {
    _id: "19",
    case_id: "WB-9740-20240502-00006",
    case_name:
      "WB-9740-20240502-00006 (Potential Bruteforce Attack - Sensitive App Target)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 09:23:02",
    case_status: "Open",
  },
  {
    _id: "20",
    case_id: "WB-9740-20240502-00008",
    case_name:
      "WB-9740-20240502-00008 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-05-02 11:57:20",
    case_status: "On Progress",
  },
  // Continue the pattern for the remaining data...
];

export default exampleProjectsData;
