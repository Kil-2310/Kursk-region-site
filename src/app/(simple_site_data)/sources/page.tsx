import type { Metadata } from 'next';

import SourcesSection from '@/shared/ui/SourcesSection';

export const metadata: Metadata = {
    title: 'Источники',
    description: 'Источники сайта kursk-region.ru',
};

export default function SourcesPage() {
    return (
        <>
            <SourcesSection />
        </>
    );
}
