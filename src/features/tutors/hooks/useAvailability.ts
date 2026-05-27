import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AvailabilitySlot } from '@/src/types';
import { getMyProfile } from '../services/profile.service';
import { updateAvailability } from '../services/availability.service';

export const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

export function useAvailability() {
  const queryClient = useQueryClient();
  const [availabilities, setAvailabilities] = useState<AvailabilitySlot[]>([]);
  const [newSlot, setNewSlot] = useState<AvailabilitySlot>({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '17:00',
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['tutor-profile'],
    queryFn: getMyProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateAvailability,
    onSuccess: () => {
      toast.success('Availability updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['tutor-profile'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update availability');
    },
  });

  useEffect(() => {
    if (profile?.tutorProfile?.availabilities) {
      setTimeout(() => {
        setAvailabilities([...profile.tutorProfile.availabilities]);
      }, 0);
    }
  }, [profile?.tutorProfile?.id, profile?.tutorProfile?.availabilities]);

  const addSlot = () => {
    const conflict = availabilities.some(
      (slot) =>
        slot.dayOfWeek === newSlot.dayOfWeek &&
        ((newSlot.startTime >= slot.startTime && newSlot.startTime < slot.endTime) ||
          (newSlot.endTime > slot.startTime && newSlot.endTime <= slot.endTime) ||
          (newSlot.startTime <= slot.startTime && newSlot.endTime >= slot.endTime))
    );
    if (conflict) {
      toast.error('This time slot conflicts with an existing availability.');
      return;
    }
    if (newSlot.startTime >= newSlot.endTime) {
      toast.error('End time must be after start time.');
      return;
    }
    setAvailabilities([...availabilities, { ...newSlot }]);
    setNewSlot({ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' });
  };

  const removeSlot = (index: number) =>
    setAvailabilities(availabilities.filter((_, i) => i !== index));

  const handleSave = () => updateMutation.mutate(availabilities);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return {
    isLoading,
    availabilities,
    newSlot,
    setNewSlot,
    addSlot,
    removeSlot,
    handleSave,
    formatTime,
    isSaving: updateMutation.isPending,
  };
}
