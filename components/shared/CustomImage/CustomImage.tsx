'use client'
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";

interface CustomImageProps extends ImageProps {
    className?: string;
    shimmerClassName?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
    src,
    alt,
    width,
    height,
    className = "",
    shimmerClassName = "",
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className={clsx("relative overflow-hidden", className)}
            style={{ width, height }}
        >
            {isLoading && (
                <div
                    className={clsx(
                        "absolute inset-0 animate-pulse bg-gray-800",
                        shimmerClassName
                    )}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={clsx("transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </div>
    );
};

export default CustomImage;
