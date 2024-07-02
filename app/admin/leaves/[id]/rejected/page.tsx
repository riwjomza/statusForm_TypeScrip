'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from '@/features/shadcn/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { Badge } from '@/features/shadcn/components/ui/badge';
import { Undo2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'; // Import SweetAlert2

interface LeaveItem {
  req: string;
  add_apprv: string;
  add_apprv_date: string;
  req_date: number;
  mo_date: string;
  doc_id: string;
  en_req: string;
  fname: string;
  lname: string;
  doc_name: string;
  doc_color: string;
  doc_site: string;
  doc_size: string;
  doc_desc: string;
  doc_qty: string;
}

const AddminRej = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [data, setData] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split('/');
      const idPart = parts[parts.length - 2]; // Fetch the second last part from the pathname
      setUserId(idPart); // Set userId as the second last part of the pathname
    }
  }, [pathname]); // Dependency array with only pathname

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserRejDoc/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          console.log(2, result)
          setData(result.showUserRejDocResult || []);
          setLoading(false);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unexpected error occurred');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userId]); // Dependency array with only userId

  const statusColor = (req: LeaveItem['req']) => {
    switch (req) {
      case 'PENDING':
      case 'Pending':
        return 'bg-cyan-500';
      case 'APPROVED':
        return 'bg-green-500';
      case 'REJECTED':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const onBack = () => {
    router.back();
  }

  const handleChangeStatus = async (doc_id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/UpRejToPend/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            doc_id: doc_id,
            status: 'PENDING',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update status');
        }

        Swal.fire({
          title: "Updated!",
          text: "The document status has been changed to PENDING.",
          icon: "success"
        }).then(() => {
          router.back(); 
       });

        // Update the local state to reflect the change
        setData((prevData) =>
          prevData.map((item) =>
            item.doc_id === doc_id ? { ...item, req: 'PENDING' } : item
          )
        );
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error instanceof Error ? error.message : 'An unexpected error occurred',
          icon: "error"
        });
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data found</div>;

  return (
    <section>
      <Undo2 size={60} className="absolute pb-6" onClick={onBack} />
      <h1 className="my-4 text-center text-4xl font-bold">All Rejected Documents</h1>
      <Separator className="my-4"></Separator>

      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item: LeaveItem, index: number) => (
          <div key={index}>
            <Card className="flex flex-col">
              <CardHeader className="font-bold text-xl">
                <div className="flex">
                  <div>Status:</div>
                  <div className='text-red-600 ml-10'>{item.req}</div>
                </div>
              </CardHeader>
              <CardHeader className="font-bold text-xl">
                <div className="flex">
                  <div>Document ID:</div>
                  <div className='text-red-600 ml-10'>{item.doc_id}</div>
                </div>
              </CardHeader>
              <CardHeader className="font-bold text-xl">
                <div className="flex">
                  <div>EN Supervisor:</div>
                  <div className='text-red-600 ml-2'>{item.add_apprv}</div>
                </div>
              </CardHeader>
              <Separator className="my-1"></Separator>
              <CardContent className="font-bold">
                <div className="flex">
                  <div>Requestor:</div>
                  <div className='text-red-600 ml-2'>{item.fname} {item.lname}</div>
                </div>
              </CardContent>
              <CardContent className="font-bold">Request Date: {item.req_date}</CardContent>
              <CardContent className="font-bold">Reject Date: {item.mo_date}</CardContent>
              <CardContent className="font-bold">EN Requestor: {item.en_req}</CardContent>
              <CardContent className="font-bold">EN Document Name: {item.doc_name}</CardContent>
              <CardContent className="font-bold">Color: {item.doc_color}</CardContent>
              <CardContent className="font-bold">Site: {item.doc_site}</CardContent>
              <CardContent className="font-bold">Size: {item.doc_size}</CardContent>
              <CardContent className="font-bold">Description: {item.doc_desc}</CardContent>
              <CardContent className="font-bold">QTY: {item.doc_qty}</CardContent>

              <Separator></Separator>
              <CardFooter className="flex items-center justify-between px-6 py-4">
                <Badge className={statusColor(item.req)}>{item.req}</Badge>
                <Badge className="bg-blue-500 cursor-pointer" onClick={() => handleChangeStatus(item.doc_id)}>Change REJECTED to PENDING</Badge>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddminRej;
