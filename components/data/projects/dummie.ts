import { ProjectLHPType } from "@/lib/case.model";

// Example projects data of type ProjectLHPType[]
const exampleProjectsData: ProjectLHPType[] = [
  {
    _id: "1",
    case_id: "WB-9740-20240430-00003",
    model_name:
      "WB-9740-20240430-00003 (Potential Impersonation Attempt - Impossible Travel)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 07:34:24",
    case_status: "Open",
    impact_scope: "Esthera Jackson esthera@simmmple.com",
  },
  {
    _id: "2",
    case_id: "WB-9740-20240430-00004",
    model_name:
      "WB-9740-20240430-00004 (Potential Brute Force Attack - Password Guessing)",
    case_severity: "MEDIUM",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 07:46:14",
    case_status: "On Progress",

    impact_scope: "Esthera Jackson esthera@simmmple.com",
  },
  {
    _id: "3",
    case_id: "WB-9740-20240430-00008",
    model_name:
      "WB-9740-20240430-00008 (Potential Impersonation Attempt - Atypical Travel)",
    case_severity: "HIGH",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 11:21:43",
    case_status: "Closed",

    impact_scope: "Esthera Jackson esthera@simmmple.com",
  },
  {
    _id: "4",
    case_id: "WB-9740-20240430-00009",
    model_name:
      "WB-9740-20240430-00009 (Potential Impersonation Attempt - Impossible Travel)",
    case_severity: "LOW",
    data_processor: "Microsoft Entra ID",
    created_at: "2024-04-30 12:00:04",
    case_status: "On Progress",

    impact_scope: "Mohamad Farrel Athaillah Nugroho farrelathaillah@gmail.com",
  },
  // Continue the pattern for the remaining data...
];

export default exampleProjectsData;
