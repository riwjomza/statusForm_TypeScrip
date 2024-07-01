import { z } from 'zod';

export * as z from 'zod';

export const signin = z.object({
  enID : z.string().min(8),
  password : z.string().min(8),
})

