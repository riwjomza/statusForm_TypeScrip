import { findAll } from '@/features/articles/api';
import ArticlesList from '@/features/articles/components/ArticleList';
import CreateArticle from '@/features/articles/components/CreateArticle';

const ArticlesPage = async () => {
  const articles = await findAll();

  return (
  <>
  <ArticlesList articles={articles}></ArticlesList>;
  <CreateArticle></CreateArticle>

  </>
  ) 
    
};

export default ArticlesPage;

export const revalidate = 15;// รีทุกๆ15วิ isr
