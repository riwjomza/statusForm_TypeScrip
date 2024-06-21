'use client'
import LeaveList from "@/features/leaves/components/LeaveList";
import { useGetLeaves } from "@/features/leaves/hooks/api";

const LeavePage =  () =>{
const {loading,leaves} =  useGetLeaves();

  if(loading) return <div>Loading...</div>;
  return <LeaveList leaves = {leaves}></LeaveList>;
    
}
export default LeavePage;