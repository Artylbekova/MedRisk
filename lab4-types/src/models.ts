export type Sex = 'male' | 'female' | 'other';
export type PatientStatus = 'active' | 'inactive';
export interface Patient { readonly id: number; fullName: string; age: number; sex: Sex; systolicBP: number; heartRate: number; priorAdmissions: number; diabetes: boolean; status: PatientStatus; readonly createdAt: string; notes?: string }
export interface RiskAssessment { readonly patientId: number; score: number; level: 'low' | 'medium' | 'high'; modelVersion: string; disclaimer: string }
export interface User { readonly id: number; email: string; passwordHash: string; role: 'doctor' | 'admin'; displayName: string }
