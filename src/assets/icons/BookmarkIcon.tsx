interface IBookmarkIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const BookmarkIcon: React.FunctionComponent<IBookmarkIconProps> = ({
    width = '18px',
    height = '18px',
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
            <title>Saved</title>
            <polygon
                fill='none'
                points='20 21 12 13.44 4 21 4 3 20 3 20 21'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
            ></polygon>
        </svg>
    );
};

export default BookmarkIcon;
