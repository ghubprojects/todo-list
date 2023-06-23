import classNames from 'classnames/bind';
import { FunctionComponent, SelectHTMLAttributes } from 'react';
import styles from './SelectField.module.scss';
import SelectOption from './SelectOption';

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
                {options.map((option) => (
                    <SelectOption key={option.value} value={option.value} label={option.label} />
                ))}
            </select>
        </div>
    );
};

export default SelectField;
