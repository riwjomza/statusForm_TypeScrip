// 'use client';

// import LeaveList from '@/features/leaves/components/LeaveList';
// import { useGetLeaves } from '@/features/leaves/hooks/api';

// const LeavesPage = () => {
//   const { data, status } = useGetLeaves();

//   if (status === 'pending') return <div>Loading...</div>;
//   if (!data) return <div>No leaves found</div>;
//   return <LeaveList leaves={data}></LeaveList>;
// };

// export default LeavesPage;
'use client'

const LeavesPage =()=>{
  return(
    <div>Wrong Page No data, Please go back</div>
  )

}
export default LeavesPage;