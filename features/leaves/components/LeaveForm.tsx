'use client';
import {
  type AddLeaveInput,
  type UpdateLeaveInput,
} from '@/features/leaves/types';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { capitalize } from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../validators';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/features/shadcn/components/ui/form';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { Textarea } from '@/features/shadcn/components/ui/textarea';
import { Button } from '@/features/shadcn/components/ui/button';
import { Input } from '@/features/shadcn/components/ui/input'; // Import the Input component

import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/features/shadcn/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/shadcn/components/ui/popover';
import { cn } from '@/features/shadcn/utils';
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import { Undo2 } from 'lucide-react';

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddLeaveInput>;
    }
   
const LeaveForm = (props: LeaveFormProps) => {
  const router = useRouter();
  const { kind, onSubmit } = props;
  const title = `${capitalize(kind)} Data`;
  const form = useForm<
    typeof onSubmit extends SubmitHandler<AddLeaveInput>
      ? AddLeaveInput
      : UpdateLeaveInput
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.update,
    ),
  });
  const onBack = () =>{
    router.back(); 
  }
  return (
    <Form {...form}>
            <Undo2 size={60} className="absolute pb-6"  onClick={onBack}/>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-center text-3xl font-bold">{title}</h1>
        <Separator className="my-4" />

        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the First name here"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ente Last name here"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

  <FormField
          control={form.control}
          name="enNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EN</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the First name here"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="docName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the document name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paperSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Size</FormLabel>
              <FormControl>
                <select className="ml-3" {...field}>
                  <option value="">Select paper size</option>
                  <option value="A4">A4</option>
                  <option value="A3">A3</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <select className="ml-3" {...field}>
                  <option value="">Select color</option>
                  <option value="black-white">Black-white</option>
                  <option value="color">Color</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sideOfPaper"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Side of Paper</FormLabel>
              <FormControl>
                <select className="ml-3" {...field}>
                  <option value="">Select side of paper</option>
                  <option value="front-only">Front Only</option>
                  <option value="front-back">Front - Back</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the quantity"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your leave"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="my-4"
          disabled={!form.formState.isValid}
        >
          {title}
        </Button>
      </form>
    </Form>
  );
};

export default LeaveForm;
