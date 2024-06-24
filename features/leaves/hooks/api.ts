import {
  type UpdateLeaveInput,
  type AddLeaveInput,
  type LeaveDetails,
  type LeaveItem,
} from '@/features/leaves/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetLeaves = () => {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: async () => {
      const res = await fetch('/api/leaves');
      const leaves = await (res.json() as Promise<LeaveItem[]>);

      return leaves;
    },
  });
};

export const useGetLeave = (id: LeaveDetails['id']) => {
  return useQuery({
    queryKey: ['leaves', id],
    queryFn: async () => {
      const res = await fetch(`/api/leaves/${id}`);
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};

export const useCreateLeave = () => {
  return useMutation({
    mutationFn: async (input: AddLeaveInput) => {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};

export const useEditLeave = (id: LeaveDetails['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['leaves', id] });//เคลียค่าcash
    },
    mutationFn: async (input: UpdateLeaveInput) => {
      const res = await fetch(`/api/leaves/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      const leave = await (res.json() as Promise<LeaveDetails>);

      return leave;
    },
  });
};
