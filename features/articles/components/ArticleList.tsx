import { type findAll } from '@/features/articles/api';

interface ArticleListProps {
  articles: Awaited<ReturnType<typeof findAll>>;
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
};

export default ArticleList;
