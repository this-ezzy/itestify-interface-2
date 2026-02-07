import { HomeView } from '@/views';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'I-Testify'
}

export default function Home() {
  return (
    <HomeView />
  );
}
