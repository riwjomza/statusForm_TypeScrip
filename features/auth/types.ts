import * as validators from './validators';
import type * as z from 'zod';


export type Signin = z.infer<typeof validators.signin>;

export type Role = 'YES' |'NO'

export interface Profile{
  EN_No: string | number;
  E_Name: string;
  E_FName: string;
  FPosuse: string;
  FDeptcode: string;
  role:Role;
}