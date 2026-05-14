import Footer from '@/shared/ui/Footer';
import BlockArticles from '@/shared/ui/BlocksArticle';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <BlockArticles />
            <Footer />
        </>
    );
}
