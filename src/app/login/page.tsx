'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classes from '../page.module.css';
import DoubleNavbar from '@/components/DoubleNavbar';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/components/AuthContext';
import { LoadingOverlay } from '@mantine/core';

function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className={classes.pageWrapper}>
        <DoubleNavbar />
        <div className={classes.pageContent}>
          <LoadingOverlay visible />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className={classes.pageWrapper}>
      <DoubleNavbar />
      <div className={classes.pageContent}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;