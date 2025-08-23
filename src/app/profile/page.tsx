'use client';
import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  Badge, 
  Group,
  Stack,
  Avatar,
  Divider,
  Card,
  Box,
  Grid
} from '@mantine/core';
import { IconUser, IconMail, IconCrown, IconCalendar } from '@tabler/icons-react';
import classes from '../page.module.css';
import DoubleNavbar from '@/components/DoubleNavbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
    <div className={classes.pageWrapper}>
      <DoubleNavbar />
      <div className={classes.pageContent}>
        <ProtectedRoute>
          <Container size="md">
            <Title order={1} mb="xl" ta="center">My Profile</Title>
            
            <Paper withBorder shadow="md" p={30} radius="md">
              <Group mb="xl">
                <Avatar
                  size={80}
                  radius="xl"
                  color="blue"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Title order={2}>{user?.name}</Title>
                  <Text c="dimmed" size="sm">
                    {user?.isPremium ? 'Premium Member' : 'Free Member'}
                  </Text>
                  {user?.isPremium && (
                    <Badge color="gold" variant="light" mt={5}>
                      <IconCrown size={12} style={{ marginRight: 4 }} />
                      Premium
                    </Badge>
                  )}
                </div>
              </Group>
              
              <Divider mb="xl" />
              
              <Grid>
                <Grid.Col span={12}>
                  <Card withBorder p="md" radius="md">
                    <Group mb="md">
                      <IconUser size={20} />
                      <Title order={4}>Account Information</Title>
                    </Group>
                    <Stack gap="sm">
                      <Group>
                        <IconMail size={16} />
                        <div>
                          <Text size="sm" fw={500}>Email</Text>
                          <Text size="sm" c="dimmed">{user?.email}</Text>
                        </div>
                      </Group>
                      <Group>
                        <IconUser size={16} />
                        <div>
                          <Text size="sm" fw={500}>Full Name</Text>
                          <Text size="sm" c="dimmed">{user?.name}</Text>
                        </div>
                      </Group>
                      <Group>
                        <IconCalendar size={16} />
                        <div>
                          <Text size="sm" fw={500}>Member Since</Text>
                          <Text size="sm" c="dimmed">January 2024</Text>
                        </div>
                      </Group>
                    </Stack>
                  </Card>
                </Grid.Col>
                
                <Grid.Col span={12}>
                  <Card withBorder p="md" radius="md">
                    <Title order={4} mb="md">Account Statistics</Title>
                    <Grid>
                      <Grid.Col span={6}>
                        <Box ta="center">
                          <Title order={3} c="blue">12</Title>
                          <Text size="sm" c="dimmed">Images Viewed</Text>
                        </Box>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Box ta="center">
                          <Title order={3} c="green">
                            {user?.isPremium ? '∞' : '5'}
                          </Title>
                          <Box size="sm" c="dimmed">
                            {user?.isPremium ? 'Unlimited Access' : 'Views Remaining'}
                          </Box>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Grid.Col>
              </Grid>
            </Paper>
          </Container>
        </ProtectedRoute>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;