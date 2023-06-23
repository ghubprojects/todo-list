import classNames from 'classnames/bind';
import { ComponentProps, FunctionComponent } from 'react';
import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

const TextField: FunctionComponent<ComponentProps<'input'>> = ({ className, ...restProps }) => (
    <input type='text' className={cx('text-field', className)} {...restProps} />
);

export default TextField;
