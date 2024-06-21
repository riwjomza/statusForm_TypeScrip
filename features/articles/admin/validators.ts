
import {z} from 'zod'


export const add = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image: z.string().min(1),
})

//กำหนดกฏใหม่ ไม่ต้องส่ง ตัวที่มี ? มาก็ได้เหมือนกัน
export const update = add.partial();

