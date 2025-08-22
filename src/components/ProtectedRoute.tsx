'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { LoadingOverlay, Alert } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean;
}

export default function ProtectedRoute({ children, requirePremium = false }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <LoadingOverlay visible />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requirePremium && !user?.isPremium) {
    return (
      <Alert icon={<IconLock size={16} />} title="Premium Required" color="orange">
        This feature requires a premium account. Please upgrade to access this content.
      </Alert>
    );
  }

  return <>{children}</>;
}