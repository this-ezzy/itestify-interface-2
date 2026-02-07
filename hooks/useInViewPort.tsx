import { useEffect, useRef, useState } from "react";

export default function useInViewport<T extends HTMLElement>(
    options?: IntersectionObserverInit
) {
    const ref = useRef<T | null>(null);
    const [isInViewport, setIsInViewport] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            options
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [options]);

    return { ref, isInViewport };
}
