interface IMenuActiveIconProps {
    width?: string;
    height?: string;
}

const MenuActiveIcon: React.FunctionComponent<IMenuActiveIconProps> = ({
    width = '24px',
    height = '24px',
}) => {
    return (
        <svg
            width={width}
            height={height}
            color='rgb(0, 0, 0)'
            fill='rgb(0, 0, 0)'
            viewBox='0 0 24 24'
        >
            <path d='M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z'></path>
        </svg>
    );
};

export default MenuActiveIcon;
