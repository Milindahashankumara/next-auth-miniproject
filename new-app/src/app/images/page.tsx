'use client';
import React from 'react';
import { 
  Container, 
  Title, 
  SimpleGrid, 
  Card, 
  Image, 
  Text, 
  Badge,
  Group,
  Button
} from '@mantine/core';
import classes from '../page.module.css';
import DoubleNavbar from '@/components/DoubleNavbar';
import { useAuth } from '@/components/AuthContext';

// Sample image data
const sampleImages = [
  {
    id: 1,
    title: 'Mountain Landscape',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    description: 'Beautiful mountain scenery with snow-capped peaks',
    isPremium: false,
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
    description: 'Stunning sunset over the ocean waves',
    isPremium: false,
  },
  {
    id: 3,
    title: 'Forest Path',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    description: 'Mystical forest path with morning light',
    isPremium: true,
  },
  {
  id: 4,
  title: 'City Skyline',
  url: 'https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?auto=format&fit=crop&w=400&h=300',
  description: 'Modern city skyline at night',
  isPremium: false,

  },
  {
    id: 5,
    title: 'Aurora Borealis',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop',
    description: 'Northern lights dancing in the sky',
    isPremium: true,
  },
  {
    id: 6,
    title: 'Desert Dunes',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    description: 'Golden sand dunes under blue sky',
    isPremium: true,
  },
];

function ImagesPage() {
  const { user, isAuthenticated } = useAuth();

  const canViewImage = (image: any) => {
    if (!image.isPremium) return true;
    return isAuthenticated && user?.isPremium;
  };

  return (
    <div className={classes.pageWrapper}>
      <DoubleNavbar />
      <div className={classes.pageContent} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
        <Container size="xl" py="xl">
          <Title order={1} mb="xl" ta="center">
            Image Gallery
          </Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {sampleImages.map((image) => (
              <Card key={image.id} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  {canViewImage(image) ? (
                    <Image
                      src={image.url}
                      height={200}
                      alt={image.title}
                    />
                  ) : (
                    <div 
                      style={{ 
                        height: 200, 
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#868e96'
                      }}
                    >
                      Premium Content - Login Required
                    </div>
                  )}
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{image.title}</Text>
                  {image.isPremium && (
                    <Badge color="gold" variant="light">
                      Premium
                    </Badge>
                  )}
                </Group>

                <Text size="sm" c="dimmed">
                  {image.description}
                </Text>

                {image.isPremium && !canViewImage(image) && (
                  <Button 
                    variant="light" 
                    color="blue" 
                    fullWidth 
                    mt="md" 
                    radius="md"
                    component="a"
                    href="/login"
                  >
                    Login to View
                  </Button>
                )}
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </div>
    </div>
  );
}

export default ImagesPage;