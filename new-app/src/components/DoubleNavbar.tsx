'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  IconDeviceDesktopAnalytics,
  IconHome2,
  IconLogout,
  IconLogin2,
  IconUser,
  IconPhoto,
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './DoubleNavbar.module.css';
import { useAuth } from '@/components/AuthContext';

//reuse the interface in multiple components or places
interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

function NavbarLink ({icon: Icon, label, active, onClick, href}: NavbarLinkProps) {

    const content = (

        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
           <Icon size={20} stroke={1.5} />
        </UnstyledButton>
    );

    return (

        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            {href ? <Link href={href}>{content}</Link> : content}
        </Tooltip>
               
    );
    
}

export default function DoubleNavbar() {

  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(0);

   // Update active state based on current path
  useEffect(() => {
    
    if (pathname === '/') setActive(0);
    else if (pathname === '/images') setActive(1);
    else if (pathname === '/premium') setActive(2);
    else if (pathname === '/profile') setActive(3);
    else if (pathname === '/login') setActive(4);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/');

  };

  // Define navigation items based on auth state
  const getNavItems = () => {
    const baseItems = [
      { icon: IconHome2, label: 'Home', href: '/' },
      { icon: IconPhoto, label: 'Images', href: '/images' },
    ];

    if (isAuthenticated) {
      return [
        ...baseItems,
        { icon: IconDeviceDesktopAnalytics, label: 'Premium', href: '/premium' },
        { icon: IconUser, label: 'Profile', href: '/profile' },
      ];
    } else {
      return [
        ...baseItems,
        { icon: IconLogin2, label: 'Login', href: '/login' },
      ];
    }
  };


  const navItems = getNavItems();

  const links = navItems.map((link, index) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      href={link.href}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));


  return(

    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      {isAuthenticated && (
        <Stack justify="center" gap={0}>
          <NavbarLink 
            icon={IconLogout} 
            label="Logout" 
            onClick={handleLogout}
          />
        </Stack>
      )}
    </nav>
  );



}

