interface IMenuIconProps {
    width?: string;
    height?: string;
}

const MenuIcon: React.FunctionComponent<IMenuIconProps> = ({ width = '24px', height = '24px' }) => {
    return (
        <svg
            widths={width}
            height={height}
            color='rgb(0, 0, 0)'
            fill='rgb(0, 0, 0)'
            viewBox='0 0 24 24'
        >
            <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='3'
                x2='21'
                y1='4'
                y2='4'
            ></line>
            <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='3'
                x2='21'
                y1='12'
                y2='12'
            ></line>
            <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='3'
                x2='21'
                y1='20'
                y2='20'
            ></line>
        </svg>
    );
};

export default MenuIcon;
