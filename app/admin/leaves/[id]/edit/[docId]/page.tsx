'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import Swal from 'sweetalert2';
import { Undo2 } from 'lucide-react';

interface LeaveItem {
  desc: string;
  doc_color: string;
  doc_name: string;
  doc_qty: number;
  doc_site: string;
  doc_size: string;
  en_req: string;
  status: string;
  doc_id: string;
  date_req: string;
  fname:string;
  lname:string;
}

const EditLeave = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const en_appr = pathSegments.length > 4 ? pathSegments[3] : ''; // Extracting en_appr from URL
  const doc_id = pathSegments.length > 5 ? pathSegments[5] : ''; // Extracting doc_id from URL

  const [leaveItem, setLeaveItem] = useState<LeaveItem | null>(null);

  const onBack = () =>{
    router.back(); 
  }
  useEffect(() => {
    const fetchLeaveItem = async () => {
      if (doc_id) {
        try {
          const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showEachUserDoc/${doc_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch document data');
          }
          const data = await response.json();
          const item = data.showEachUserDocResult[0]; // Extracting the first item from the result array
          setLeaveItem(item); // Setting the fetched data to leaveItem state
        } catch (error) {
          console.error('Error fetching document data:', error);
        }
      }
    };

    fetchLeaveItem();
  }, [doc_id]);

  const handleApprove = async () => {
    const result = await Swal.fire({
      title: 'Are you sure to APPROVE?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('http://10.50.10.5:8000/Service_Riw.svc/rest/UpAppInfo3/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doc_id: leaveItem?.doc_id,
            en_appr,
            status: 'APPROVED',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to approve document');
        }

        Swal.fire({
          title: 'Approved!',
          text: 'The document has been approved.',
          icon: 'success'
        }).then(() => {
           router.back(); 
        });

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error approving the document.',
          icon: 'error'
        });
      }
    }
  };
  

  const handleReject = async () => {
    const result = await Swal.fire({
      title: 'Are you sure to REJECT?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('http://10.50.10.5:8000/Service_Riw.svc/rest/UpRejInfo4/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doc_id: leaveItem?.doc_id,
            en_appr,
            status: 'REJECTED',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to reject document');
        }

        Swal.fire({
          title: 'Rejected!',
          text: 'The document has been rejected.',
          icon: 'success'
        }).then(() => {
          router.back(); 
        });

      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error rejecting the document.',
          icon: 'error'
        });
      }
    }
  };

 
  if (!leaveItem) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <section>
      <Undo2 size={60} className="absolute  pb-6"  onClick={onBack} />
      <h1 className="my-4 text-center text-4xl font-bold">Confirm Document</h1>
      <Separator className="my-4"></Separator>
      <div className="mx-auto grid grid-cols-1">
        <Card className="flex flex-col">
     
              <CardHeader className="font-bold flex">
            <div className='flex'>
              <div >
            Docname ID: 
              </div>
            <div className='ml-20 text-blue-500 font-bold '>
                 {leaveItem.doc_id}
               </div>
              </div>  
              </CardHeader>  
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
            Date request (MM/DD/YY): 
              </div>
            <div className='ml-10 text-blue-500 font-bold '>
                 {leaveItem.date_req}
               </div>
              </div>  
              </CardContent>
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Reqeustor :
              </div>
            <div className='ml-10 text-blue-500 font-bold '>
                 {leaveItem.fname} {leaveItem.lname} 
               </div>
              </div>  
              </CardContent> 
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
               Document Name:
              </div>
            <div className='ml-10 text-blue-500  font-bold '>
                 {leaveItem.doc_name}
               </div>
              </div>  
              </CardContent>      
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Size:
              </div>
            <div className='ml-20 text-blue-500  font-bold '>
                 {leaveItem.doc_size}
               </div>
              </div>  
              </CardContent>      
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Site:
              </div>
            <div className='ml-20 text-blue-500  font-bold '>
                 {leaveItem.doc_site}
               </div>
              </div>  
              </CardContent>  
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Quantity:
              </div>
            <div className='ml-20 text-blue-500 font-bold '>
                 {leaveItem.doc_qty}
               </div>
              </div>  
              </CardContent>
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Color:
              </div>
            <div className='ml-20 text-blue-500  font-bold '>
                 {leaveItem.doc_color}
               </div>
              </div>  
              </CardContent>
              <CardContent className="font-bold flex">
            <div className='flex'>
              <div >
              Description:
              </div>
            <div className='ml-10 text-blue-500  font-bold '>
                 {leaveItem.desc}
               </div>
              </div>  
              </CardContent>
   
          <Separator></Separator>
          <CardFooter className="flex items-center justify-center px-6 py-4">
            <Button className="text-lg mr-3 bg-green-500" onClick={handleApprove}>APPROVE</Button>
            <Button className="text-lg ml-3 bg-red-500" onClick={handleReject}>REJECT</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default EditLeave;
