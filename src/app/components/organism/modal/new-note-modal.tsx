/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  IconButton,
  CircularProgress,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, useForm } from 'react-hook-form';
import TextFieldDefault from '../../molecules/text-field/default';
import TextEditor from '../../molecules/text-editor/default';
import MultiSelectWithChips from '../../molecules/select/multi-select-with-chips';
import { useCreateNote } from '@/app/hooks/useNoteMutations';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteCreated: (note: any) => void;
  allTags: { id: number; name: string }[];
}

interface NoteFormData {
  title: string;
  content: string;
  tags: number[];
}

const NewNoteModal = ({ isOpen, onClose, onNoteCreated, allTags }: NewNoteModalProps) => {
  const methods = useForm<NoteFormData>();
  const { 
    control,
    handleSubmit, 
    reset,
    formState: { errors },
  } = methods;

  // Use the mutation hook
  const { mutate: createNote, isPending: isSubmitting } = useCreateNote();

  const onSubmit = (data: NoteFormData) => {
    createNote(data, {
      onSuccess: (createdNote) => {
        onNoteCreated(createdNote);
        reset();
        onClose();
      },
      onError: (error) => {
        console.error('Error creating note:', error);
      }
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  }

  const tagOptions = allTags.map(tag => ({
    label: tag.name,
    value: tag.id
  }));

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '70vh'
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create New Note
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextFieldDefault
              name="title"
              control={control}
              label="Title"
              rules={{ required: 'Title is required' }}
              errors={errors.title?.message}
              variant="outlined"
              className="mb-4"
            />

            <TextEditor
              name="content"
              control={control}
              label="Content"
              errors={errors.content?.message}
              placeholder="Write your note content here..."
              className="mb-4"
            />

            <MultiSelectWithChips
              name="tags"
              control={control}
              label="Tags"
              options={tagOptions}
              errors={errors.tags?.message}
            />
          </Box>
        </FormProvider>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          sx={{ borderRadius: 1 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          sx={{ borderRadius: 1 }}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Creating...' : 'Create Note'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNoteModal;