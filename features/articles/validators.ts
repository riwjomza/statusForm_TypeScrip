
import {z} from 'zod'
//ใช่ zod เพื่อ validate ข้อมูล
// {
//   name: 'Somchai',
//   gender:'male',
//   age:24,
//   email: 'sonchai@gmail.com',
//   password: '12345678'
// }

export const add = z.object({
  title: z.string(),
})

//กำหนดกฏใหม่ ไม่ต้องส่ง ตัวที่มี ? มาก็ได้เหมือนกัน
export const update = add.partial();

// z.object({
//   name: z.string(),
//   gender: z.enum(['male','female']), enum ทางเลือก
//   age: z.number().min(1),
//   email: z.string().email(),
//   password: z.string().min(8)min ความยาว

// })