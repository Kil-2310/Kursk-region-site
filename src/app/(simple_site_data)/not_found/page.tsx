import type { Metadata } from 'next';

import NotFoundSection from '@/shared/ui/NotFoundSection';

export const metadata: Metadata = {
    title: 'Не найдено',
    description: 'Заданная страница не существует',
};

export default function NotFoundPage() {
    return <NotFoundSection />;
}
