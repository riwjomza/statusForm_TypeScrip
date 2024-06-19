// export const GET = () => {
//   const articles = [{id:1},{id:2}]
//   return Response.json(articles)
// }

import { findAll } from '@/features/articles/api';

export const GET = async () => {
  const articles = await findAll();

  return Response.json(articles);
};

// new Response(JSON.stringify(articles),{
//   status:200,
//   headers:{
//   'Content-Type': 'application/json'
// }})
// เขียนstaus กลับไปได้ได้วย / ส่งก้อนข้อมูลได้ด้วย