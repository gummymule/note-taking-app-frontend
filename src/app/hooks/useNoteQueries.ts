// hooks/useNoteQueries.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export const useNotes = (showArchived: boolean) => {
  return useQuery({
    queryKey: ['notes', { archived: showArchived }],
    queryFn: () => 
      api.get('/notes', {
        params: { archived: showArchived }
      }).then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => 
      api.get('/tags').then((res) => res.data),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};