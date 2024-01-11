import Routed from "./router";
import {useState, useEffect} from 'react';

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export default function Scaled() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isTablet = windowDimensions.width < 1266;
    const isMobile = windowDimensions.width < 679;

    return <Routed mode={{isMobile, isTablet}}/>;
}
