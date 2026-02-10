import React from 'react'
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

interface Props {
    size?: number;
    color?: string;
    speed?: number
}

const LoadingSpinner = ({ size = 20, color = "#727981", speed = 1 }: Props) => {
    return (
        <Spinner color={color} size={size} speed={speed} animating={true} />
    )
}

export default LoadingSpinner