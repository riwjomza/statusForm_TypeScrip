'use client'

import { useGetArticles } from "@/features/articles/admin/hooks/api"
import ArticleList from "@/features/articles/admin/components/ArticleList"

const ArticlePage = () =>{

  const articles = useGetArticles()

  if(!articles || articles.length === 0) return <div>No articles found</div>
  return <ArticleList articles={articles}></ArticleList>
}

export default ArticlePage