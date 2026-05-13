import { memo } from 'react';
import dataTable from './dataTable';
import styles from './Table.module.scss';

const Table = ({ tableTitle }) => {
    const data = dataTable[tableTitle];

    return (
        <section>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {data['headers'].map((head, index) => (
                            <th key={index}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data['rows'].map((row, index) => (
                        <tr key={index}>
                            {row.map((description, index) => (
                                <td key={index}>{description}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default memo(Table);
