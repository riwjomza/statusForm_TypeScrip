// import {type add} from '@/features/leaves/admin/validators';
import type * as z from 'zod';
import type * as api from './api';

export type LeaveItem = Awaited<ReturnType<typeof api.findAll>>[number];