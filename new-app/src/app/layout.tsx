// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { AuthProvider } from '@/components/AuthContext';

export const metadata = {
  title: 'My Next app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AuthProvider>
            <div>
              <div className='content'>{children}</div>
            </div>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}