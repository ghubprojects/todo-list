interface IHomeIconProps {
    width?: string;
    height?: string;
}

const HomeIcon: React.FunctionComponent<IHomeIconProps> = ({ width = '24px', height = '24px' }) => {
    return (
        <svg
            width={width}
            height={height}
            color='rgb(0, 0, 0)'
            fill='rgb(0, 0, 0)'
            viewBox='0 0 24 24'
        >
            <path
                d='M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z'
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></path>
        </svg>
    );
};

export default HomeIcon;
