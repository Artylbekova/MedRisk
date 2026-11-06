export const SEXES = ['male','female','other'] as const;
export type Sex = typeof SEXES[number];
export const STATUSES = ['active','inactive'] as const;
export type PatientStatus = typeof STATUSES[number];
export interface Patient { id:number; fullName:string; age:number; sex:Sex; systolicBP:number; heartRate:number; priorAdmissions:number; diabetes:boolean; status:PatientStatus; readonly createdAt:string }
export type PatientInput = Omit<Patient,'id'|'createdAt'>;
export type PatientPatch = Partial<PatientInput>;
export type PatientSummary = Pick<Patient,'id'|'fullName'|'status'>;
export interface Paginated<T> {items:T[];total:number;page:number;limit:number}
export type Result<T> = {ok:true;data:T}|{ok:false;error:{status:number;message:string}};
export interface RiskAssessment {patientId:number;score:number;level:'low'|'medium'|'high';modelVersion:string;disclaimer:string}
