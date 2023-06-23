import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'large' | 'medium' | 'small';
    color?: 'indigo' | 'green' | 'red';
};

const Button: React.FC<ButtonProps> = ({
    children,
    size = 'medium',
    color = 'indigo',
    className,
    ...rest
}) => {
    // Merging classes with button size and button color
    const buttonClasses = cx(
        'button',
        {
            [`button--${size}`]: size,
            [`button--${color}`]: color,
        },
        className,
    );

    return (
        <button className={buttonClasses} {...rest}>
            {children}
        </button>
    );
};

export default Button;
