

import * as api from '@/features/articles/admin/api';
import { revalidatePath } from 'next/cache';

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const image = formData.get('image') as File | null;
  const article = api.add({
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    image,
  });

  revalidatePath('/articles');

  return new Response(JSON.stringify(article), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};


// import { create } from '@/features/articles/api';
// import { type CreateArticleInput } from '@/features/articles/types';
// import { add } from '@/features/articles/validators';
// import { revalidatePath } from 'next/cache';

// export const POST = async (req: Request) => {
//   const form = await (req.json() as Promise<CreateArticleInput>);//Promise<CreateArticleInput> บอกโครงสร้างข้อมูลคืออะไร
//   const formValidation = await add.safeParseAsync(form);// validate data ขอมูลอยู่ตามกฏใน add รึปล่าว

//   if (!formValidation.success) {
//     return new Response(JSON.stringify(formValidation.error), {
//       status: 422,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }

//   const article = await create(formValidation.data);
//   revalidatePath('/articles');//บอกให้มันรู้ว่าไม่Updateละนะเคลียhtml เก่าให้หน่อยสำหรับ build แบบ static
//   return new Response(JSON.stringify(article), {
//     status: 201,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// import { CreateArticleInput } from "@/features/articles/types"
// import { add } from "@/features/articles/validators";
// import { create } from "@/features/articles/api";
// export const POST = async (req:Request) =>{
//   const form = await (req.json() as Promise<CreateArticleInput>) //Promise<CreateArticleInput> บอกโครงสร้างข้อมูลคืออะไร
//   const formValidation = await add.safeParseAsync(form) ;// validate data ขอมูลอยู่ตามกฏใน add รึปล่าว

//   if(!formValidation.success){
//     return new Response(JSON.stringify(formValidation.error),{
//       status:422,
//       headers:{
//         'content-Type': 'application/json',
//       },
//     });
//   }

//   const article = await create(formValidation.data)
//   return new Response(JSON.stringify(article),{
//     status:201,
//     headers:{
//       'content-Type': 'application/json',
//     },
//   });
// };
