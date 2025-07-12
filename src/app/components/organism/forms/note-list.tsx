/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import NoteDetail from './note-detail';
import api from '@/services/api';
import NewNoteModal from '../modal/new-note-modal';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  styled,
  TextField,
  InputAdornment,
  Badge,
  Stack,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import ButtonDefault from '../../atoms/button/default';
import Image from 'next/image';
import { ModalErrorUtil, ModalLoadingUtil } from '@/helpers/modal';
import { useNotes, useTags } from '@/app/hooks/useNoteQueries';
import { useQueryClient } from '@tanstack/react-query';
import LogoutIcon from '@mui/icons-material/Logout';

interface Note {
  id: number;
  title: string;
  content: string;
  last_edited: string;
  archived: boolean;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    borderLeft: `4px solid ${theme.palette.primary.main}`
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.action.selected
  }
}));

const NoteList = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const queryClient = useQueryClient();
  
  // Queries with ModalLoadingUtil integration
  const { 
    data: notes = [], 
    isLoading: isLoadingNotes,
    isError: isErrorNotes,
    error: notesError 
  } = useNotes(showArchived);

  const { 
    data: allTags = [], 
    isLoading: isLoadingTags,
    isError: isErrorTags,
    error: tagsError 
  } = useTags();

  // Show loading modal when either query is loading
  useEffect(() => {
    if (isLoadingNotes || isLoadingTags) {
      ModalLoadingUtil.showModal();
    }
  }, [isLoadingNotes, isLoadingTags]);

  // Hide loading when done (success or error)
  useEffect(() => {
    if (!isLoadingNotes && !isLoadingTags) {
      ModalLoadingUtil.hideModal();
    }
  }, [isLoadingNotes, isLoadingTags]);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const filteredNotes = notes.filter((note: { title: string; content: string; tags: any[]; }) => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag: { name: string; }) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag ? note.tags.some((tag: { name: string; }) => tag.name === selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  const handleLogout = async () => {
    // Add your logout logic here
    await api.post('/logout');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleNoteCreated = (newNote: Note) => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    setSelectedNote(newNote);
  };

  const handleNoteUpdated = () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  const handleNoteDeleted = (deletedNoteId: number) => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    if (selectedNote?.id === deletedNoteId) {
      setSelectedNote(null);
    }
  };

  if (isErrorNotes || isErrorTags) {
    ModalLoadingUtil.hideModal();
    ModalErrorUtil.showModal(notesError?.message || tagsError?.message);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      {/* Tags and menu Sidebar */}
      <Paper sx={{ 
          width: 240, 
          minWidth: 240, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'auto',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <List dense disablePadding>
            <ListItemButton sx={{ pt: 2, pb: 2, pl: 3 }}>
              <Image src={"/logo.svg"} alt="Logo" width={100} height={100} style={{ objectFit: 'contain' }} />
            </ListItemButton>
            <ListItemButton 
              onClick={() => {
                setSelectedTag(null);
                setShowArchived(false);
              }} 
              selected={!selectedTag && !showArchived}
              sx={{ pl: 3,
                ...( !selectedTag && !showArchived && {
                  backgroundColor: 'primary.main',
                  color: 'black',
                  '& .MuiSvgIcon-root': {
                    color: 'black',
                  }
                })
              }}
            >
              <HomeOutlinedIcon sx={{ mr: 1 }} />
              <ListItemText primary="All Notes" />
              <Badge badgeContent={notes.filter((n: Note) => !n.archived).length} color="primary" sx={{ mr: 1 }} />
            </ListItemButton>
            <ListItemButton 
              onClick={() => {
                setSelectedTag(null);
                setShowArchived(true);
              }}
              selected={showArchived}
              sx={{ pl: 3,
                ...( showArchived && {
                  backgroundColor: 'primary.main',
                  color: 'black',
                  '& .MuiSvgIcon-root': {
                    color: 'black',
                  }
                })
              }}
            >
              <ArchiveOutlinedIcon sx={{ mr: 1 }} />
              <ListItemText primary="Archived Notes" />
              <Badge 
                badgeContent={notes.filter((n: Note) => n.archived).length} 
                color="primary" 
                sx={{ mr: 1 }} 
              />
            </ListItemButton>
            <Divider />
            <ListItemText sx={{ pl: 3, mt: 2, mb: 1 }}>Tags</ListItemText>
            {allTags.map((tag: Tag) => (
              <ListItemButton 
                key={tag.id} 
                onClick={() => setSelectedTag(tag.name)}
                selected={selectedTag === tag.name}
                sx={{ pl: 3 }}
              >
                <LocalOfferOutlinedIcon sx={{ mr: 1 }} />
                <ListItemText primary={tag.name} />
                <Badge 
                  badgeContent={notes.filter((n: Note) => n.tags.some(t => t.name === tag.name)).length} 
                  color="primary" 
                  sx={{ mr: 1 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Paper>
      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
        {/* Navigation Bar */}
        <AppBar 
          position="static" 
          color="default" 
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', gap: 5 }}>
            <Box>
              <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', mr: 3 }}>
                All Notes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <TextField
                size="small"
                placeholder="Search notes and tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  
                }}
                sx= {{
                  backgroundColor: 'background.paper',
                  width: 400,
                  gap: 8
                }}
              />
              <ButtonDefault
                variant="text" 
                onClick={handleLogout}
                sx={{ color: 'text.primary', textTransform: 'none' }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
              </ButtonDefault>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Notes List and Detail */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {/* Notes List */}
          <Paper sx={{ 
            width: 360, 
            minWidth: 360, 
            display: 'flex', 
            flexDirection: 'column',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)'
          }}>
            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
              <ListItemButton 
                sx={{ alignItems: 'center', justifyContent: 'space-between', my: 2 }}
              >
                <ButtonDefault
                  className="w-full"
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsNewNoteModalOpen(true)}
                  sx={{ mr: 1, pt: 1, pb: 1, px: 2, textTransform: 'none' }}
                >
                  Create New Note
                </ButtonDefault>
              </ListItemButton>
              <List dense disablePadding>
                {filteredNotes.map((note: Note) => (
                  <StyledListItem
                    key={note.id}
                    disablePadding
                  >
                    <ListItemButton 
                      onClick={() => handleNoteClick(note)}
                      selected={selectedNote?.id === note.id}
                    >
                      <ListItemText
                        primary={note.title}
                        secondaryTypographyProps={{ component: 'div' }}
                        secondary={
                          <div>
                            <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
                              {note.tags.map(tag => (
                                <Chip
                                  key={tag.id}
                                  label={tag.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: '0.65rem' }}
                                />
                              ))}
                            </Stack>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {format(new Date(note.last_edited), 'MMM dd, yyyy')}
                            </Typography>
                          </div>
                        }
                      />
                    </ListItemButton>
                  </StyledListItem>
                ))}
              </List>
            </Box>
          </Paper>

          {/* Note Detail */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            {selectedNote ? (
              <NoteDetail
                note={selectedNote}
                isEditing={isEditing}
                allTags={allTags}
                onEditToggle={() => setIsEditing(!isEditing)}
                fetchNotes={handleNoteUpdated}
                setSelectedNote={setSelectedNote}
                onNoteDeleted={handleNoteDeleted}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: 'text.secondary'
                }}
              >
                <Typography variant="h6">Select a note to view or edit</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      
      <NewNoteModal
        isOpen={isNewNoteModalOpen}
        onClose={() => setIsNewNoteModalOpen(false)}
        onNoteCreated={handleNoteCreated}
        allTags={allTags}
      />
    </Box>
  );
};

export default NoteList;