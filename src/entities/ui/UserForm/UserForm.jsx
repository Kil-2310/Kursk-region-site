'use client';

import { useState } from 'react';
import styles from './UserForm.module.scss';
import Button from '@/shared/ui/Button';
import useUser from '@/entities/model/useUser';
import { SECRET_FORM_KEY } from '/config_data'

const UserForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sendFeedback = useUser();

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        await sendFeedback(formData);
        setIsSubmitting(false)
    };

    return (
        <form onSubmit={submitForm} className={styles.form}>
            <h1>Форма обратной связи</h1>

            <input type="hidden" name="access_key" value={SECRET_FORM_KEY} />

            <div>
                <label htmlFor="email" className="form-label">
                    Электронная почта (необязательно):{' '}
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                />
            </div>

            <div>
                <label htmlFor="content" className="form-label">
                    Ваш комментарий:{' '}
                </label>
                <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    minLength={3}
                    required
                ></textarea>
            </div>

            <div>
                <Button className={'red_button'} type={'reset'}>
                    Очистить
                </Button>

                <Button className={'blue_button'} type={'submit'} isDisabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
