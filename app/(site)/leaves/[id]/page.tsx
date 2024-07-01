'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Plus, Delete } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { Badge } from '@/features/shadcn/components/ui/badge';
import Swal from "sweetalert2";

interface LeaveItem {
  desc: string;
  doc_color: string;
  doc_name: string;
  doc_qty: number;
  doc_site: string;
  doc_size: string;
  en_req: string;
  status: string;
  doc_id: string; // Assuming each document has a unique ID
  date_req:string;
}

const UserId = () => {
  const router = useRouter();

  const pathname = usePathname();
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<LeaveItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const id = pathname.split('/').pop();
      if (id) {
        const userId = id.split(',')[1];
        setUserId(userId);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserDoc/No,${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result.showUserDocResult);
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unexpected error occurred');
          }
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId]);

  const handleDelete = async (doc_id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/DelDocs/${doc_id}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to delete document');
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        // Revalidate the page by fetching the data again
        const newResponse = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserDoc/No,${userId}`);
        const newData = await newResponse.json();
        setData(newData.showUserDocResult);

      } catch (error) {
        if (error instanceof Error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error"
          });
        }
      }
    }
  };

  const statusColor = (status: LeaveItem['status']) => {
    switch (status) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <section>
      <h1 className="my-4 text-center text-4xl font-bold">All Documents</h1>
      <Separator className="my-4"></Separator>

      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item: LeaveItem, index: number) => (
          <div key={index}>
            <Card className="flex flex-col">
            <CardHeader className="font-bold text-xl">
                <div className="flex">
                  <div>
                  ID : 
                  </div>
                  <div className='text-blue-400 ml-2'>
                  {item.doc_id}      
                   </div>
                </div>               
                </CardHeader>
                <CardHeader className="font-bold text-xl">
                <div className="flex">
                  <div>
                  Name : 
                  </div>
                  <div className='text-blue-400 ml-2'>
                  {item.doc_name}      
                   </div>
                </div>               
                </CardHeader>
              <Separator className="my-1"></Separator>
              <CardContent className="font-bold">Date Request: {item.date_req}</CardContent>
              <CardContent className="font-bold">Size: {item.doc_size}</CardContent>
              <CardContent className="font-bold">Site: {item.doc_site}</CardContent>
              <CardContent className="font-bold">Quantity: {item.doc_qty}</CardContent>
              <CardContent className="font-bold">Color: {item.doc_color}</CardContent>
              <CardContent className="font-bold">Description: {item.desc}</CardContent>

              <Separator></Separator>
              <CardFooter className="flex items-center justify-between px-6 py-4">
                <Badge className={statusColor(item.status)}>{item.status}</Badge>
                <button onClick={() => handleDelete(item.doc_id)}>
                  <Delete className="h-6 w-6"></Delete>
                </button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="z-100 fixed bottom-10 right-10 flex items-center justify-center rounded-full bg-blue-600 text-white drop-shadow"
        onClick={() => router.push(`/leaves/${userId}/new`)}
      >
        <Plus></Plus>
      </Button>
    </section>
  );
};

export default UserId;
