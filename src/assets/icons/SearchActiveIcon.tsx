interface ISearchActiveIconProps {
    width?: string;
    height?: string;
}

const SearchActiveIcon: React.FunctionComponent<ISearchActiveIconProps> = ({
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
            <path
                d='M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
            ></path>
            <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                x1='16.511'
                x2='21.643'
                y1='16.511'
                y2='21.643'
            ></line>
        </svg>
    );
};

export default SearchActiveIcon;
