import { redirect } from 'next/navigation';

// Это корневая страница. В целях улучшения производительности идет перенаправление на home/

export default function HomePage() {
    redirect('/home');
}
