import { useCallback, useEffect, useState } from "react";

export default function useInViewport<T extends HTMLElement>(
    options?: IntersectionObserverInit
) {
    const [node, setNode] = useState<T | null>(null);
    const [isInViewport, setIsInViewport] = useState(false);

    const ref = useCallback((el: T | null) => {
        setNode(el);
    }, []);

    useEffect(() => {
        const element = node;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [node, options]);

    return { ref, isInViewport };
}