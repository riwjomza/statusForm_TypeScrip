import { findById } from "@/features/announcements/api";
import AnnouncementDetails from "@/features/announcements/components/AnnoncementDetails";

interface AnnouncementsPageProps{
  params : { 
    id: string;// url are all string

  }
}
const AnnouncementsPage = async({params:{id}} :AnnouncementsPageProps) =>{
  
const announcement = await findById(+id)//ใส่+ from string to number 
  return<AnnouncementDetails announcement = {announcement}></AnnouncementDetails>
}
export default AnnouncementsPage;