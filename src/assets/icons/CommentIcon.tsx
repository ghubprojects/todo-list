interface ICommentIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const CommentIcon: React.FunctionComponent<ICommentIconProps> = ({
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
            <path
                d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></path>
        </svg>
    );
};

export default CommentIcon;
