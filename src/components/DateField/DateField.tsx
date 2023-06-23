import classNames from 'classnames/bind';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './DateField.module.scss';

const cx = classNames.bind(styles);

interface DateFieldProps extends ComponentProps<'input'> {
    label?: string;
}

const DateField: FunctionComponent<DateFieldProps> = ({ label, className, ...restProps }) => (
    <div className={cx('date-field', className)}>
        {label && <label>{label}</label>}
        <input type='date' className={cx('date-input')} {...restProps} />
    </div>
);

export default DateField;
