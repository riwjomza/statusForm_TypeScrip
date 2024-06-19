import { findById } from "@/features/articles/api";
import ArticleDetails from "@/features/articles/components/ArticleDetails";
import { type Article } from '@/features/articles/types';

interface ArticlePageProps{
  params : { 
    id: string;// url are all string

  }
}
export const generateStaticParams = () => {
  return [{ id: '1' }, { id: '3' }];
};// gen ssg รอไว้ก่อน-

const ArticlePage = async({params:{id}} :ArticlePageProps) =>{
const article = await findById(+id)//ใส่+ from string to number 
if (!article) return <div>No article found</div>;
  return (
    <ArticleDetails article={article}></ArticleDetails>
  );
}
export default ArticlePage;