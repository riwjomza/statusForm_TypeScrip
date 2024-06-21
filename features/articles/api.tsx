import db from '@/features/shared/db';

export const findAll = async () => {
  const articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return articles;
};

export const findById = async (id: number) => {
  const article = await db.article.findUnique({
    where: { id },
  });

  return article;
};


// import db from '@/features/shared/db'

// export const findAll = async () =>{
//   const article = await db.articel.findMany({
//     select: { // หน้าจอที่ใช้findAll จะใช้อะไรแสดงผลบ้าง ให้ดึงเฉพาะส่วนนั้น
//       id:true,
//       title:true,
//       slug:true,
//       excerpt: true,
//       image: true
//     },
//     orderBy:{
//       updateAt: 'desc', 
//     }
//   })

//   return article;
// }

// export const findById = async (id:number) =>{
//   const article = await db.article.findUnique({
//     where: {id} , 
   
//   })
//   return article
// }








// import { Article, CreateArticleInput, UpdateArticleInput } from '@/features/articles/types';
// import {faker} from '@faker-js/faker'

// const length = faker.helpers.rangeToNumber({min:3 , max:10})
// let articles = Array.from({length}).map(()=>({
//   id: faker.number.int(),
//   title: faker.lorem.sentence(),
// }))

// export const findAll = ()  => { 

//   return Promise.resolve(articles);
// }

// export const findById = async (id: Article['id']) => {
//   const article = articles.find((article) => article.id === id);

//   if (!article) return Promise.resolve(null);

//   return Promise.resolve(article);
// };
//   //const res = await fetch(`http://localhost:5151/articles/${id}`,{next: {revalidate:15}})
//   //15 วิbuild html ใหม่ (ssg)

//   //return res.json() as Promise<Article>



// export const create = (form:CreateArticleInput) =>{
//   const article = {
//     id: faker.number.int(),
//     ...form,
//   }

//   articles.push(article)
// return Promise.resolve(article);
// }

// export const update = async(id: Article['id'], form: UpdateArticleInput) => { // form คนละตัวกับ form validate
//   const article = await findById(id)
// if(!article) return Promise.resolve(null)

// Object.assign(article,form);//ให้เอาข้อมูลในform มาเขียนทับตัว Article
// return Promise.resolve(article);
// }

// //[{id :1},{id:2},{id:3}]
// //[{id:1},{id:3}]
// export const remove = (id:Article['id']) =>{
// const index = articles.findIndex(article => article.id === id)
// const newArticles = [
//   ...articles.slice(0,index),//เอาข้อมูลก่อนหน้า index 
//   ...articles.slice(index+1),//ขอมูลหลัง
// ];

// articles = newArticles;
// return Promise.resolve(index);
// }