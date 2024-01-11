import {useState, useEffect} from 'react';
import MainApp from "./MainApp";

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export default function MainAppModed({fetcher}) {
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

    return <MainApp mode={{isMobile, isTablet}} fetcher={fetcher}/>;
}
