/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import TextFieldDefault from '../../molecules/text-field/default';
import TextEditor from '../../molecules/text-editor/default';
import { Box, Chip, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ButtonDefault from '../../atoms/button/default';
import MultiSelectWithChips from '../../molecules/select/multi-select-with-chips';
import { useRouter } from 'next/navigation';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useArchiveNote, useDeleteNote, useUpdateNote } from '@/app/hooks/useNoteMutations';

interface NoteDetailProps {
  note: any;
  isEditing: boolean;
  allTags: any[];
  onEditToggle: () => void;
  fetchNotes: () => void;
  setSelectedNote: (note: any | null) => void;
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
  setSelectedNote,
  onNoteDeleted
}: NoteDetailProps) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Mutation hooks
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();
  const archiveNoteMutation = useArchiveNote();

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
  } = useForm<NoteFormData>({
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags.map((tag: any) => Number(tag.id))
    }
  });

  const onSubmit = async (data: NoteFormData) => {
    try {
      const payload = {
        id: note.id,
        ...data,
        tags: Array.isArray(data.tags) ? data.tags.map(tag => Number(tag)) : []
      };
      
      await updateNoteMutation.mutateAsync(payload);
      onEditToggle();
      reset();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNoteMutation.mutateAsync(note.id);
      setDeleteDialogOpen(false);
      if (onNoteDeleted) {
        onNoteDeleted(note.id);
      } else {
        router.push('/notes');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleArchiveNote = async () => {
    try {
      await archiveNoteMutation.mutateAsync({
        id: note.id,
        archived: !note.archived
      });
      
      if (!note.archived) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  useEffect(() => {
    reset({
      title: note.title,
      content: note.content,
      tags: note.tags.map((tag: any) => Number(tag.id))
    });
  }, [note, reset]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      p: 3,
      overflow: 'auto'
    }}>
      {isEditing ? (
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: '16px'
          }}
        >
          <TextFieldDefault
            name="title"
            control={control}
            label="Title"
            variant="outlined"
            rules={{ required: 'Title is required' }}
            errors={errors.title?.message}
          />
          
          <TextEditor
            name="content"
            control={control}
            label="Content"
            errors={errors.content?.message}
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
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2,
            pt: 2
          }}>
            <ButtonDefault
              variant="outlined"
              onClick={onEditToggle}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </ButtonDefault>
            <ButtonDefault
              type="submit"
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Save
            </ButtonDefault>
          </Box>
        </form>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          height: '100%' 
        }}>
          <Paper sx={{ 
            flex: { xs: 1, md: 2 },
            p: 3,
            overflow: 'auto',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
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
              <div className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
            </Box>
          </Paper>
          <Paper sx={{ 
            flex: { xs: 0, md: 1 },
            p: 3,
            overflow: 'auto',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
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
                onClick={handleArchiveNote}
                sx={{ textTransform: 'none' }}
                startIcon={note.archived ? <UnarchiveIcon /> : <ArchiveIcon />}
              >
                {note.archived ? 'Unarchive Note' : 'Archive Note'}
              </ButtonDefault>
              <ButtonDefault
                variant="outlined"
                onClick={onEditToggle}
                sx={{ textTransform: 'none' }}
                startIcon={<BorderColorIcon />}
              >
                Edit Note
              </ButtonDefault>
              <ButtonDefault
                variant="outlined"
                onClick={() => setDeleteDialogOpen(true)}
                startIcon={<DeleteIcon />}
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
            disabled={deleteNoteMutation.isPending}
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
            }}
          >
            {deleteNoteMutation.isPending ? 'Deleting...' : 'Delete'}
          </ButtonDefault>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoteDetail;