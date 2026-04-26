import styles from './PreviewArticle.module.scss';
import dataPreviewArticle from './dataPreviewArticle';
import Image from 'next/image';

const PreviewArticle = ({ previewTitle }) => {
    const data = dataPreviewArticle[previewTitle];

    return (
        <section className={styles.preview_article}>
            <Image
                src={data.image}
                width={900}
                height={600}
                alt={data.alt}
                className="html_image"
            />
            <h1>{data.title}</h1>
        </section>
    );
};

export default PreviewArticle;
