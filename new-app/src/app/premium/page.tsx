'use client';

import { Container, Title, Text, Card, SimpleGrid, Badge, Button, Stack, Group } from '@mantine/core';

// Simple version without external imports first
export default function PremiumPage() {
  // Mock user data for now
  const user = {
    name: 'Premium User',
    role: 'premium'
  };

  const premiumFeatures = [
    {
      title: 'Advanced Analytics',
      description: 'Get detailed insights and analytics for your account activity.',
      available: true,
      color: 'blue'
    },
    {
      title: 'Priority Support',
      description: '24/7 priority customer support with faster response times.',
      available: true,
      color: 'green'
    },
    {
      title: 'Premium Image Gallery',
      description: 'Access to exclusive high-resolution images and premium content.',
      available: true,
      color: 'violet'
    },
    {
      title: 'API Access',
      description: 'Full API access with higher rate limits and advanced features.',
      available: user?.role === 'premium' || user?.role === 'admin',
      color: 'orange'
    }
  ];

  const stats = [
    { label: 'Images Downloaded', value: '247' },
    { label: 'API Calls This Month', value: '15,430' },
    { label: 'Storage Used', value: '2.4 GB' },
    { label: 'Days Active', value: '89' }
  ];

  return (
    <Container size="lg" py="xl">
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Title size="h1" mb="md">
          Premium Dashboard
        </Title>
        <Text size="lg" c="dimmed" mb="lg">
          Welcome to your premium experience, {user?.name}! 
          Here are your exclusive features and statistics.
        </Text>
        <Badge size="lg" color="violet" variant="light">
          Premium Member
        </Badge>
      </div>

      {/* Stats Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Title order={3} mb="md">Your Statistics</Title>
        <SimpleGrid cols={{ base: 2, md: 4 }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <Text size="xl" fw={700} c="blue">
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.label}
              </Text>
            </div>
          ))}
        </SimpleGrid>
      </Card>

      {/* Features Section */}
      <Title order={2} mb="lg">Premium Features</Title>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {premiumFeatures.map((feature, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Group mb="md" justify="space-between">
              <Title order={4}>{feature.title}</Title>
              <Badge 
                color={feature.available ? 'green' : 'gray'} 
                variant="light"
                size="sm"
              >
                {feature.available ? 'Available' : 'Locked'}
              </Badge>
            </Group>
            
            <Text size="sm" c="dimmed" mb="md">
              {feature.description}
            </Text>
            
            <Button 
              variant={feature.available ? 'filled' : 'light'} 
              color={feature.available ? feature.color : 'gray'}
              size="sm"
              disabled={!feature.available}
              fullWidth
            >
              {feature.available ? 'Access Feature' : 'Upgrade Required'}
            </Button>
          </Card>
        ))}
      </SimpleGrid>

      {/* Quick Actions */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl">
        <Title order={3} mb="md">Quick Actions</Title>
        <Stack>
          <Button variant="light" color="blue" fullWidth>
            Browse Premium Gallery
          </Button>
          <Button variant="light" color="green" fullWidth>
            Download Usage Report
          </Button>
          <Button variant="light" color="violet" fullWidth>
            Manage Subscription
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}