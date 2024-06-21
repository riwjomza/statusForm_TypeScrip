import db from '@/features/shared/db'


export const findAll = async () =>{
  const announcement = await db.announcement.findMany({
    select:{
      id:true,
      slug:true,
      title:true,
      excerpt: true,

    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  return announcement
}

export const findById = async(id:number)=>{
  const announcement = await db.announcement.findUnique({
    where: {id},
  })
  if(!announcement) throw new Error('announcement not found')
  return announcement
}
// import { Announcement } from '@/features/announcements/types';
// import {faker} from '@faker-js/faker'
// export const findAll = ()  => { 
//   const length = faker.helpers.rangeToNumber({min:3 , max:10})
//   const announcements = Array.from({length}).map(()=>({
//     id: faker.number.int(),
//     title: faker.lorem.sentence(),
//   }))

//   return Promise.resolve(announcements);
// };


// export const findById = async(id:Announcement['id']) =>{
//   const res = await fetch(`http://localhost:5151/announcements/${id}`,{
//     cache: 'no-store',
//   });//no-store คือ ไม่ต้องจดจำค่านี้ใน cache นะ ทำการbuildใหม่เลย (ssr)

//   return res.json() as Promise<Announcement>
// } 


