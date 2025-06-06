"use client";

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NoteList from './components/organism/forms/note-list';
import { FormProvider, useForm } from 'react-hook-form';
import LoadingSpinner from './components/atoms/loading/default';

export default function Home() {
  const { user, isLoading } = useAuth(); // Added isLoading from AuthContext
  const router = useRouter();
  const methods = useForm();

  useEffect(() => {
    // Only redirect if not loading and no user
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Return null briefly while redirecting to login
  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <FormProvider {...methods}>
        <NoteList />
      </FormProvider> 
    </div>
  );
}