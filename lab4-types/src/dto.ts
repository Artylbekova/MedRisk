import type {Patient,User} from './models.js';
export type CreatePatientDto = Omit<Patient,'id'|'createdAt'>;
export type UpdatePatientDto = Partial<CreatePatientDto>;
export type PublicUserDto = Pick<User,'id'|'role'|'displayName'>;
export type Paginated<T> = {items:T[];total:number;page:number;limit:number};
export type Result<T> = {ok:true;data:T}|{ok:false;error:string;status?:number};
