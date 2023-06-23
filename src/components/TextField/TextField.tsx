import classNames from 'classnames/bind';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

interface TextFieldProps extends ComponentProps<'input'> {
    label?: string;
}

const TextField: FunctionComponent<TextFieldProps> = ({ label, className, ...restProps }) => (
    <div className={cx('text-field', className)}>
        {label && <label>{label}</label>}
        <input type='text' className={cx('text-field-input', className)} {...restProps} />
    </div>
);

export default TextField;
