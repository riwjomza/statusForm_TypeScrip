// 'use client';

import LeaveForm from '@/features/leaves/components/LeaveForm';
import { useCreateLeave } from '@/features/leaves/hooks/api';
import { AddLeaveInput } from '@/features/leaves/types';
import { useRouter } from 'next/navigation';

interface CreateLeaveProps {
  userId: string; // Define userId as prop
}

const CreateLeave: React.FC<CreateLeaveProps> = ({ userId }) => {
  const router = useRouter();
  const { mutateAsync } = useCreateLeave();

  const createLeave = async (form: AddLeaveInput) => {
    try {
      // Assign userId to the form data before sending it to the API
      const formData = { ...form, en_req: userId };

      await mutateAsync(formData);
      router.push(`/leaves/${userId}`); // Navigate back to the user's leaves page
    } catch (error) {
      console.error('Error creating leave:', error);
      // Handle error as needed
    }
  };

  return <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm>;
};

export default CreateLeave;