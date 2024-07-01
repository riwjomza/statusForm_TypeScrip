import {
 
  type LeaveItem
} from '@/features/leaves/admin/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const useGetLists = (role: string, en_no: string) => {
  return useQuery({
    queryKey: ['leaves', role, en_no],
    queryFn: async () => {
      const res = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserDoc/${role},${en_no}`);
      if (!res.ok) {
        throw new Error('Failed to fetch leaves');
      }
      const data = await res.json();
      return data.showUserDocResult as LeaveItem[];
    },
// export const useGetLists = (authToken: string, enNo: string) => {
//   return useQuery({
//     queryKey: ['leaves', enNo],
//     queryFn: async () => {
//       const res = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserDoc/YES,${enNo}`, {
//         headers: {
//           'Authorization': `Bearer ${authToken}`, // If an auth token is needed
//         },
//       });
//       const leaves = await (res.json() as Promise<LeaveItem[]>);

//       if (!res.ok) {
//         throw new Error('Failed to fetch leaves');
//       }

//       return leaves;
//     },
  });
}