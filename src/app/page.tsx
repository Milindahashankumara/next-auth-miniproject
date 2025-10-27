'use client';
import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Card, 
  SimpleGrid,
  Badge
} from '@mantine/core';
import { IconPhoto, IconUser, IconStar } from '@tabler/icons-react';
import DoubleNavbar from '@/components/DoubleNavbar';
import classes from './page.module.css';
import { useAuth } from '@/components/AuthContext';

function Homepage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={classes.pageWrapper}>
      <DoubleNavbar />
      <div className={classes.pageContent}>
        <Container size="md" ta="center">
          <Title order={1} mb="md">
            Welcome to Our Platform
            {isAuthenticated && (
              <Text component="span" inherit c="blue" ml="sm">
                {user?.name}!
              </Text>
            )}
          </Title>
          
          {isAuthenticated && user?.isPremium && (
            <Badge color="gold" size="lg" mb="md">
              Premium Member
            </Badge>
          )}
          
          <Text size="lg" c="dimmed" mb="xl">
            {isAuthenticated 
              ? "Explore our features and premium content designed just for you."
              : "This platform offers amazing features for everyone. Join us to unlock exclusive content!"
            }
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mb="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="center" mb="md">
                <IconPhoto size={48} color="blue" />
              </Group>
              <Title order={4} ta="center" mb="sm">Image Gallery</Title>
              <Text size="sm" c="dimmed" ta="center" mb="md">
                Browse our collection of beautiful images. Premium members get access to exclusive content.
              </Text>
              <Button 
                variant="light" 
                fullWidth 
                component="a" 
                href="/images"
              >
                View Gallery
              </Button>
            </Card>

            {isAuthenticated ? (
              <>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="center" mb="md">
                    <IconUser size={48} color="green" />
                  </Group>
                  <Title order={4} ta="center" mb="sm">My Profile</Title>
                  <Text size="sm" c="dimmed" ta="center" mb="md">
                    Manage your account settings and view your activity.
                  </Text>
                  <Button 
                    variant="light" 
                    color="green"
                    fullWidth 
                    component="a" 
                    href="/profile"
                  >
                    View Profile
                  </Button>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="center" mb="md">
                    <IconStar size={48} color="gold" />
                  </Group>
                  <Title order={4} ta="center" mb="sm">
                    {user?.isPremium ? 'Premium Dashboard' : 'Go Premium'}
                  </Title>
                  <Text size="sm" c="dimmed" ta="center" mb="md">
                    {user?.isPremium 
                      ? 'Access your premium features and exclusive content.'
                      : 'Upgrade to premium for exclusive features and content.'
                    }
                  </Text>
                  <Button 
                    variant="light" 
                    color="gold"
                    fullWidth 
                    component="a" 
                    href="/premium"
                  >
                    {user?.isPremium ? 'Premium Dashboard' : 'Learn More'}
                  </Button>
                </Card>
              </>
            ) : (
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="center" mb="md">
                  <IconUser size={48} color="blue" />
                </Group>
                <Title order={4} ta="center" mb="sm">Join Our Community</Title>
                <Text size="sm" c="dimmed" ta="center" mb="md">
                  Sign in to access your profile, premium content, and exclusive features.
                </Text>
                <Button 
                  variant="filled" 
                  fullWidth 
                  component="a" 
                  href="/login"
                >
                  Sign In
                </Button>
              </Card>
            )}
          </SimpleGrid>

          {!isAuthenticated && (
            <Card shadow="sm" padding="xl" radius="md" withBorder bg="blue.0">
              <Title order={3} mb="md">Ready to Get Started?</Title>
              <Text mb="lg">
                Join thousands of users who trust our platform for their digital needs.
              </Text>
              <Button size="lg" component="a" href="/login">
                Get Started Today
              </Button>
            </Card>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Homepage;