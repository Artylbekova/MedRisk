import { SEXES,STATUSES } from './types';
import type { Patient,Paginated,RiskAssessment } from './types';
export function isRecord(x:unknown):x is Record<string,unknown>{return typeof x==='object'&&x!==null&&!Array.isArray(x)}
export function isPatient(x:unknown):x is Patient {return isRecord(x)&&Number.isInteger(x.id)&&typeof x.fullName==='string'&&Number.isInteger(x.age)&&SEXES.includes(x.sex as typeof SEXES[number])&&typeof x.systolicBP==='number'&&typeof x.heartRate==='number'&&Number.isInteger(x.priorAdmissions)&&typeof x.diabetes==='boolean'&&STATUSES.includes(x.status as typeof STATUSES[number])&&typeof x.createdAt==='string'}
export function isPaginatedPatients(x:unknown):x is Paginated<Patient>{return isRecord(x)&&Array.isArray(x.items)&&x.items.every(isPatient)&&typeof x.total==='number'&&typeof x.page==='number'&&typeof x.limit==='number'}
export function isRiskAssessment(x:unknown):x is RiskAssessment{return isRecord(x)&&typeof x.patientId==='number'&&typeof x.score==='number'&&['low','medium','high'].includes(String(x.level))&&typeof x.modelVersion==='string'&&typeof x.disclaimer==='string'}
