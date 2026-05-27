import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getStudentBookings, submitReview } from '../services/student.services';

export function useStudentDashboard() {
  const queryClient = useQueryClient();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['student-bookings'],
    queryFn: getStudentBookings,
  });

  const reviewMutation = useMutation({
    mutationFn: () => submitReview({ tutorId: selectedTutorId, rating, comment }),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setReviewModalOpen(false);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['student-bookings'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    },
  });

  const handleOpenReview = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    setReviewModalOpen(true);
  };

  return {
    bookings,
    isLoading,
    reviewModalOpen,
    setReviewModalOpen,
    rating,
    setRating,
    comment,
    setComment,
    reviewMutation,
    handleOpenReview,
  };
}
