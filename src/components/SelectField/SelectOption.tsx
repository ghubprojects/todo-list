import classNames from 'classnames/bind';
import { FunctionComponent } from 'react';
import styles from './SelectField.module.scss';

const cx = classNames.bind(styles);

interface SelectOptionProps {
    value: string;
    label: string;
}

const SelectOption: FunctionComponent<SelectOptionProps> = ({ value, label }) => (
    <option value={value} className={cx('select-option')}>
        {label}
    </option>
);

export default SelectOption;
