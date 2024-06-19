import { type update, type add } from '@/features/articles/validators';
import { type z } from 'zod';

export interface Article {
  id: number;
  title: string;
}

export type CreateArticleInput = z.infer<typeof add>;// ใช้ typeof  เพราะ add เป็น java script

export type UpdateArticleInput = z.infer<typeof update>;