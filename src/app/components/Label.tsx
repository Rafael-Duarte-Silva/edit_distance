type LabelProps = {
    string: string;
    className: string;
    styleProp?: React.CSSProperties;
    keyPrefix: string;
};

export const Label = ({
    string,
    className,
    styleProp,
    keyPrefix,
}: LabelProps) => {
    return (
        <div
            className={className}
            style={styleProp}
        >
            <div className="h-10 w-10" />
            {string.split("").map((char, index) => (
                <div
                    key={`${keyPrefix}${index}`}
                    className="flex h-10 w-10 items-center justify-center font-semibold text-gray-300"
                >
                    {char}
                </div>
            ))}
        </div>
    );
};

