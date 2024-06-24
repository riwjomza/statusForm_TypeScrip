'use client';

import {
  type Leave,
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

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddLeaveInput>;
    }
  | {
      kind: 'edit';
      leave: Leave;
      onSubmit: SubmitHandler<UpdateLeaveInput>;
    };

const LeaveForm = (props: LeaveFormProps) => {
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
    defaultValues: kind === 'edit' ? props.leave : undefined,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-center text-3xl font-bold">{title}</h1>
        <Separator className="my-4" />
        <FormField
          control={form.control}
          name="leaveDate"
          render={({ field }) => {
            const leaveDate = new Date(field.value);

            return (
              <FormItem className="flex flex-col">
                <FormLabel>Submit Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(leaveDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={leaveDate}
                      onSelect={(date) => {
                        if (!date) return;

                        form.setValue('leaveDate', date.toISOString(), {
                          shouldValidate: true,
                        });
                      }}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
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
