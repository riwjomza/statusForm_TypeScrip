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

// export const useCreateLeave = () => {
//   return useMutation({
//     mutationFn: async (input: AddLeaveInput) => {
//       const res = await fetch('/api/leaves', {
//         method: 'POST',
//         body: JSON.stringify(input),
//       });
//       const leave = await (res.json() as Promise<LeaveDetails>);

//       return leave;
//     },
//   });
// };

export const useCreateLeave = () => {
  return useMutation({
    mutationFn: async (input: AddLeaveInput) => {
      // Map the form input to the new API's expected payload structure
      const payload = {
        doc_name: input.docName,
        doc_qty: input.quantity,
        doc_size: input.paperSize,
        doc_color: input.color,
        doc_site: input.sideOfPaper,
        status: 'PENDING', // or any default status you want to set
        desc: input.reason,
        en_req: input.enNo,
        fname: input.fname,
        lname: input.lname
        // you can generate an ID if needed, or handle it as per your requirements
      };

      const res = await fetch('http://10.50.10.5:8000/Service_Riw.svc/rest/AddDocInfo2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to create requset');
      }

      const leave = await res.json();
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
