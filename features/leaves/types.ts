import { type update, type add } from '@/features/leaves/validators';
import type * as z from 'zod';



export interface Status{
  doc_name:string
  doc_qty: number,
  doc_size:string,
  doc_color:string,
  doc_site:string,
  status: string,
  desc:string,
  en_req:string
} 

// export type LeaveItem = Awaited<ReturnType<typeof api.findAll>>[number];

// export type LeaveDetails = Awaited<ReturnType<typeof api.findById>>;

export type AddLeaveInput = z.infer<typeof add>;

export type UpdateLeaveInput = z.infer<typeof update>;
