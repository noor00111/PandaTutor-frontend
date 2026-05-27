import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Category, Subject, Tutor } from '@/src/types';
import { getTutors } from '../services/tutors.service';
import { getCategories } from '../services/profile.service';

export function useTutors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: tutors, isLoading } = useQuery<Tutor[]>({
    queryKey: ['tutors', category],
    queryFn: () => getTutors(category),
  });

  const filteredTutors = tutors?.filter((t: Tutor) =>
    t.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subjects.some((s: Subject) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    categories,
    filteredTutors,
    isLoading,
  };
}
