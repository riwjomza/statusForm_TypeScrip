import * as z from 'zod';

export const add = z.object({
  leaveDate: z
    .string({
      required_error: 'A document date is required',
    })
    .datetime(),
  reason: z.string({ required_error: 'A reason is required' }).min(1),
  docName: z.string({ required_error: 'A document name is required' }).min(1),
  paperSize: z.array(z.enum(['A4', 'A3'])).nonempty('At least one paper size is required'),
  color: z.enum(['black-white', 'color'], { required_error: 'A color type is required' }),
  sideOfPaper: z.enum(['front-only', 'front-back'], { required_error: 'A side of paper is required' }),
  quantity: z.number({ required_error: 'A quantity is required' }).min(1, 'Quantity must be at least 1'),
});

export const update = add.partial();
