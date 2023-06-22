interface ISendIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const SendIcon: React.FunctionComponent<ISendIconProps> = ({
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
            <line
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='22'
                x2='9.218'
                y1='3'
                y2='10.083'
            ></line>
            <polygon
                fill='none'
                points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></polygon>
        </svg>
    );
};

export default SendIcon;
