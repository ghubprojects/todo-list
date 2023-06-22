interface ICircleCheckIconProps {
    width?: string;
    height?: string;
    className?: string;
}

const CircleCheckIcon: React.FunctionComponent<ICircleCheckIconProps> = ({
    width = '24px',
    height = '24px',
    className,
}) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            fill='rgb(0, 149, 246)'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1000 1000'
        >
            <path d='M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M774.3,350L427.8,696.5c-15.9,15.9-41.8,15.9-57.7,0L225.7,552.2c-15.9-15.9-15.9-41.8,0-57.7c15.9-15.9,41.8-15.9,57.7,0l115.5,115.5l317.6-317.6c15.9-15.9,41.8-15.9,57.7,0C790.2,308.2,790.2,334.1,774.3,350z' />
        </svg>
    );
};

export default CircleCheckIcon;
