'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Delete, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/features/shadcn/components/ui/card';
import { Badge } from '@/features/shadcn/components/ui/badge';
import Link from 'next/link';
import { Edit } from 'lucide-react';

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
  date_req:string;
}

const AddminId = () => {
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
          const response = await fetch(`http://10.50.10.5:8000/Service_Riw.svc/rest/showUserDoc/YES,${userId}`);
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
                  Name Requestor : 
                  </div>
                  <div className='text-blue-400 ml-2'>
                  {item.en_req}      
                   </div>
                </div>               
                </CardHeader>
              <Separator className="my-1"></Separator>
              <CardContent className="font-bold">Name : {item.doc_name}</CardContent>
              <CardContent className="font-bold">Date Request: {item.date_req}</CardContent>
              <CardContent className="font-bold">Size: {item.doc_size}</CardContent>
              <CardContent className="font-bold">Site: {item.doc_site}</CardContent>
              <CardContent className="font-bold">Quantity: {item.doc_qty}</CardContent>
              <CardContent className="font-bold">Color: {item.doc_color}</CardContent>
              <CardContent className="font-bold">Description: {item.desc}</CardContent>
              <Separator></Separator>
              <CardFooter className="flex items-center justify-between px-6 py-4">
                <Badge className={statusColor(item.status)}>{item.status}</Badge>
                <Link href={{
          pathname: `/admin/leaves/${userId}/edit/${item.doc_id}`
        
        }}>
          <Edit className="h-6 w-6"></Edit>
        </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddminId;
