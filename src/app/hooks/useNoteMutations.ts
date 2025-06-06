// hooks/useNoteMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

interface NoteData {
  title: string;
  content: string;
  tags?: number[];
}

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noteData: NoteData) => 
      api.post("/notes", noteData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });
};