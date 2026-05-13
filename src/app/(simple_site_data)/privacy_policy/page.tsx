import type { Metadata } from 'next';

import PrivacyPolicySection from '@/shared/ui/PrivacyPolicySection';

export const metadata: Metadata = {
    title: 'Политика конфиденциальности',
    description: 'Политика конфиденциальности сайта kursk-region.ru',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <PrivacyPolicySection />
        </>
    );
}
