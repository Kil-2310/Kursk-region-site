import type { Metadata } from 'next';

import UserForm from '@/entities/ui/UserForm';

export const metadata: Metadata = {
    title: 'Отзывы',
    description: 'Страница с отзывами пользователей',
};

export default function ReviewsPage() {
    return (
        <>
            <UserForm />
        </>
    );
}
