/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import TextFieldDefault from '../../molecules/text-field/default';
import TextEditor from '../../molecules/text-editor/default';
import { Box, Chip, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ButtonDefault from '../../atoms/button/default';
import MultiSelectWithChips from '../../molecules/select/multi-select-with-chips';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

interface NoteDetailProps {
  note: any;
  isEditing: boolean;
  allTags: any[];
  onEditToggle: () => void;
  fetchNotes: () => void;
  onNoteDeleted?: (noteId: number) => void; // Optional callback when note is deleted
}

interface NoteFormData {
  title: string;
  content: string;
  tags: number[];
}

const NoteDetail = ({
  note,
  isEditing,
  allTags,
  onEditToggle,
  fetchNotes,
  onNoteDeleted
}: NoteDetailProps) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Prepare tag options for SelectDefault
  const tagOptions = allTags.map(tag => ({
    label: tag.name,
    value: tag.id
  }));
  
  const {
    control, 
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm<NoteFormData>({
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags.map((tag: any) => Number(tag.id))
    }
  });

  const formData = watch();
  console.log('formData', formData);

  const onSubmit = async (data: NoteFormData) => {
    try {
      const payload = {
        ...data,
        tags: Array.isArray(data.tags) 
        ? data.tags.map(tag => Number(tag)) 
        : []
      };

      const response = await api.put(`/notes/${note.id}`, payload);
      onEditToggle();
      reset();
      fetchNotes(); // This will refresh the notes list
      return response.data; // Return the updated note
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/notes/${note.id}`);
      setDeleteDialogOpen(false);
      if (onNoteDeleted) {
        onNoteDeleted(note.id);
      } else {
        // Default behavior if no callback is provided
        router.push('/notes'); // Redirect to notes list
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Reset form when note changes
  useEffect(() => {
    reset({
      title: note.title,
      content: note.content,
      tags: note.tags.map((tag: any) => Number(tag.id))
    });
  }, [fetchNotes, note, reset]);

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <TextFieldDefault
            name="title"
            control={control}
            label="Title"
            variant="outlined"
            rules={{ required: 'Title is required' }}
            errors={errors.title?.message}
            className="mb-4"
          />
          
          <TextEditor
            name="content"
            control={control}
            label="Content"
            errors={errors.content?.message}
            className="mb-4"
          />
          
          <div className="flex items-center gap-2">
            <MultiSelectWithChips
              name="tags"
              control={control}
              label="Tags"
              options={tagOptions}
              errors={errors.tags?.message}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onEditToggle}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Paper sx={{ 
            width: 640, 
            minWidth: 640,
            display: 'flex', 
            flexDirection: 'column',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            p: 3
          }}>
            {/* Header section with title and actions */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                mb: 2
              }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {note.title}
              </Typography>
            </Box>

            {/* Metadata section (tags and last edited) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              {note.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {note.tags.map((tag: any) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      sx={{ backgroundColor: 'grey.100' }}
                    />
                  ))}
                </Box>
              )}
              
              <Typography variant="body2" color="text.secondary">
                Last edited: {format(new Date(note.last_edited), 'MMM dd, yyyy HH:mm')}
              </Typography>
            </Box>

            {/* Note content section */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </Box>
          </Paper>
          <Paper sx={{ 
            width: 460, 
            minWidth: 460, 
            display: 'flex', 
            flexDirection: 'column',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            p: 3
          }}>
            {/* actions */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
              }}
            >
              <ButtonDefault
                variant="outlined"
                onClick={onEditToggle}
                sx={{ textTransform: 'none' }}
              >
                Archive Note
              </ButtonDefault>
              <ButtonDefault
                variant="outlined"
                onClick={onEditToggle}
                sx={{ textTransform: 'none' }}
              >
                Edit Note
              </ButtonDefault>
              <ButtonDefault
                variant="outlined"
                onClick={() => setDeleteDialogOpen(true)}
                sx={{ 
                  textTransform: 'none',
                  color: 'error.main',
                  borderColor: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.light',
                    borderColor: 'error.dark',
                    color: 'white'
                  }
                }}
              >
                Delete Note
              </ButtonDefault>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonDefault onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </ButtonDefault>
          <ButtonDefault 
            onClick={handleDeleteNote}
            disabled={isDeleting}
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </ButtonDefault>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoteDetail;