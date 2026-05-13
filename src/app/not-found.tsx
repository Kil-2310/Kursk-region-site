import { redirect } from 'next/navigation';

// Это страница 404. В целях улучшения производительности и архитектуры идет перенаправление на not_found/

export default function NotFound() {
    redirect('/not_found');
}
