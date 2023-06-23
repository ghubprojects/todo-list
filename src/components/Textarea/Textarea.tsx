import classNames from 'classnames/bind';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './Textarea.module.scss';

const cx = classNames.bind(styles);

interface TextareaProps extends ComponentProps<'textarea'> {
    label?: string;
}

const Textarea: FunctionComponent<TextareaProps> = ({ label, className, ...restProps }) => (
    <div className={cx('textarea')}>
        {label && <label>{label}</label>}
        <textarea className={cx('textarea-input', className)} {...restProps} />
    </div>
);

export default Textarea;
