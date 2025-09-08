'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import validator from 'validator';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert,
  Stack,
  Checkbox,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, isPremium, name }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else {
      setMessage('Registration successful!');
      setTimeout(() => router.push('/login'), 1500);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an account</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red">
                {error}
              </Alert>
            )}
            {message && (
              <Alert color="green">
                {message}
              </Alert>
            )}
            <TextInput
                label="Full Name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={e => setName(e.currentTarget.value)}
              />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            {error && <div style={{ color: 'red', marginTop: '4px' }}>{error}</div>}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Checkbox
              label="Premium Account"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.currentTarget.checked)}
            />
            <Button type="submit" fullWidth loading={loading}>
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}