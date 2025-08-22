'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
  Stack,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '@/components/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red">
                {error}
              </Alert>
            )}
            
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            
            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>
        
        <Paper mt={20} p={10} bg="gray.0">
          <Title order={6} mb={5}>Demo Accounts:</Title>
          <div style={{ fontSize: '12px' }}>
            <div><strong>Regular User:</strong> user@example.com / password123</div>
            <div><strong>Premium User:</strong> premium@example.com / premium123</div>
            <div><strong>Admin User:</strong> admin@example.com / admin123</div>
          </div>
        </Paper>
      </Paper>
    </Container>
  );
}