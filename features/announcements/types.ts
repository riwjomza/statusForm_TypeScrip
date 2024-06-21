import { findAll, findById } from "@/features/announcements/api";

export type AnnouncementItem = Awaited<ReturnType<typeof findAll>>[number]// ใส่ awited เพื่อถอด promise  ถอดArray ใส่่ Number

export type AnnouncementIDetail = NonNullable<Awaited<ReturnType<typeof findById>>>