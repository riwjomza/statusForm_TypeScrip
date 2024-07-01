import * as z from 'zod';

export const add = z.object({
  // leaveDate: z
  //   .string({
  //     required_error: 'A document date is required',
  //   })
  //   .datetime(),
  docName: z.string({ required_error: 'A document name is required' }).min(1),
  paperSize: z.string({ required_error: 'A paper size is required' }).min(1),
  color: z.string({ required_error: 'A color is required' }).min(1),
  sideOfPaper: z.string({ required_error: 'A side of paper is required' }).min(1),
  quantity: z.string({ required_error: 'A quantity is required' }).min(1),
  reason: z.string({ required_error: 'A reason is required' }).min(1),
  enNo: z.string({ required_error: 'A EN is required' }).min(1),
  fname: z.string({ required_error: 'A First name is required' }).min(1),
  lname: z.string({ required_error: 'A Last name is required' }).min(1),
  
});

export const update = add.partial();
