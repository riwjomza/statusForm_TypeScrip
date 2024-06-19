import { type Article } from "@/features/articles/types";

interface ArticleDetailsProps{
  article: Article;
}
const ArticleDetails = ({article} :ArticleDetailsProps) =>{
  return(
    <div>{article.title}</div>
  )
}
export default ArticleDetails;