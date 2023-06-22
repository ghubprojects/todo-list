interface IOptionIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const OptionIcon: React.FunctionComponent<IOptionIconProps> = ({
    width = '24px',
    height = '24px',
    className,
}) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            color='rgb(0, 0, 0)'
            fill='rgb(0, 0, 0)'
            viewBox='0 0 24 24'
        >
            <circle cx='12' cy='12' r='1.5'></circle>
            <circle cx='6' cy='12' r='1.5'></circle>
            <circle cx='18' cy='12' r='1.5'></circle>
        </svg>
    );
};

export default OptionIcon;
