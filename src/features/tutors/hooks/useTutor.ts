'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/src/store/useAuthStore';
import { getTutor, createBooking } from '../services/tutor.service';


export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function useTutorProfile(tutorId: string) {
  
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const { data: tutor, isLoading } = useQuery({
    queryKey: ['tutor', tutorId],
    queryFn: () => getTutor(tutorId),
  });

  const bookMutation = useMutation({
    mutationFn: (dateISO: string) => createBooking(tutor.user.id, dateISO),
    onSuccess: () => {
      toast.success('Session booked successfully!');
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to book session');
    },
  });

  const handleBooking = () => {
    if (!user) { toast.error('Please login to book a session'); router.push('/login'); return; }
    if (!selectedDate || !selectedTime) { toast.error('Please select a date and time'); return; }
    const dateObj = new Date(`${selectedDate}T${selectedTime}:00`);
    if (isNaN(dateObj.getTime())) { toast.error('Invalid date selection'); return; }
    bookMutation.mutate(dateObj.toISOString());
  };

  return {
    user,
    tutor,
    isLoading,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    bookMutation,
    handleBooking,
  };
}
