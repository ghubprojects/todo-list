import { FunctionComponent, SelectHTMLAttributes } from 'react';
import SelectOption from './SelectOption';

import classNames from 'classnames/bind';
import styles from './SelectField.module.scss';

const cx = classNames.bind(styles);

interface SelectOptionProps {
    value: string;
    label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOptionProps[];
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
    label,
    options,
    className,
    ...restProps
}) => {
    return (
        <div className={cx('select-field', className)}>
            {label && <label>{label}</label>}
            <select className={cx('select-input')} {...restProps}>
                {/* mapping over the options list and rendering SelectOption components  */}
                {options.map((option) => (
                    <SelectOption key={option.value} value={option.value} label={option.label} />
                ))}
            </select>
        </div>
    );
};

export default SelectField;
