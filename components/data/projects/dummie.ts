import { RuleSetType } from "@/lib/types";

// Example projects data of type ProjectLHPType[]

export const rulesData: RuleSetType[] = [
  {
    risk_factor: "Account Compromise",
    risk_event: "Potential Impersonation Attempt - Impossible Travel",
    most_impacted_assets: 41,
    real_time_score: 1.4,
    remediation:
      "• Disable or reset this account with a strong password.\n• Enable the Account Lockout Policy in your Active Directory.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event: "Potential Brute Force Attack - Password Guessing",
    most_impacted_assets: 316,
    real_time_score: 1.0,
    remediation: "• Disable or reset this account with a strong password.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event: "Potential Impersonation Attempt - Atypical Travel",
    most_impacted_assets: 83,
    real_time_score: 1.0,
    remediation:
      "• Disable or reset this account with a strong password.\n• Enable the Account Lockout Policy in your Active Directory.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event: "Leaked Account Identification",
    most_impacted_assets: 8,
    real_time_score: 0.7,
    remediation:
      "• Change the password immediately on this account and any other account where the same password is used.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event: "Potential BruteForce Attack - Password Spraying",
    most_impacted_assets: 374,
    real_time_score: 0.2,
    remediation:
      "• Enforce Multi-Factor Authentication (MFA).\n• Disable or reset this account with a strong password.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event: "Rapid Account Creation and Deletion",
    most_impacted_assets: 1,
    real_time_score: 0.2,
    remediation: "• Contact account owner to verify this event.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event:
      "Microsoft Entra ID Identity Protection Risk Detection - Anonymous IP Address",
    most_impacted_assets: 96,
    real_time_score: 0.1,
    remediation:
      "• Contact Account Owner to Verify the Event\n• Disable/ Reset this account with a Strong Password.",
  },
  {
    risk_factor: "Account Compromise",
    risk_event:
      "Microsoft Entra ID Identity Protection Risk Detection - Unfamiliar Sign-in Properties",
    most_impacted_assets: 94,
    real_time_score: 0.1,
    remediation:
      "• Disable or reset this account with a strong password.\n• Enable the Account Lockout Policy in your Active Directory.",
  },
  {
    risk_factor: "Activity & Behaviour",
    risk_event: "Unusual Audit by User",
    most_impacted_assets: 60,
    real_time_score: 0.1,
    remediation:
      "• Check whether the user or the user role has permission on the operations\n• Disable or reset this account with a strong password if they were not excepted.",
  },
  {
    risk_factor: "Activity & Behaviour",
    risk_event: "Potential Impersonation Attempt - Sudden Appearance",
    most_impacted_assets: 1,
    real_time_score: 0.1,
    remediation:
      "• Disable or reset this account with a strong password.\n• Enable the Account Lockout Policy in your Active Directory.",
  },
  {
    risk_factor: "Activity & Behaviour",
    risk_event: "Anomalous Sign-In Sign-in into App from multiple locations",
    most_impacted_assets: 1,
    real_time_score: 0.1,
    remediation:
      "• Disable or reset this account with a strong password.\n• Enable the Account Lockout Policy in your Active Directory.",
  },
];
