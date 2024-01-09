import {Expression, GraphingCalculator, elt} from "desmos-react";
import {useCallback, useEffect, useState} from "react";

function Graph({fetcher}) {

    const [calculator, setCalculator] = useState({valid: false});
    const calculatorRef = useCallback(calc => {
        if (!calc) return;

        calculator.boundingRect = elt(calc).getBoundingClientRect();
        calculator.current = calc;
        calculator.setBounds = (bounds) => calculator.current.setMathBounds({
            left: -bounds,
            right: bounds,
            bottom: -bounds,
            top: bounds
        });
        calculator.valid = true;
        setCalculator(calculator);
    }, [calculator]);

    useEffect(() => {
        if (calculator.valid && fetcher.r != null)
            calculator.setBounds(Math.min(Math.max(Math.abs(fetcher.r * 2), 4), 6));
    }, [calculator, fetcher.r]);

    function handleClick(ev) {
        if (!calculator.valid || calculator.wasMoved) return;
        const graph = calculator.current;

        const rect = calculator.boundingRect;
        let x = ev.clientX - rect.left;
        let y = ev.clientY - rect.top;
        let mathCoordinates = graph.pixelsToMath({x, y});

        ev.x = mathCoordinates.x.toFixed(2);
        ev.y = mathCoordinates.y.toFixed(2);

        fetcher.handleGraphClick(ev);
    }

    return (
        <GraphingCalculator
            attributes={{
                className: "calculator", onClick: handleClick,
                onMouseMove: ev => calculator.wasMoved = true, onMouseDown: ev => calculator.wasMoved = false
            }}
            ref={calculatorRef}
            keypad={false}
            expressions={false}
            zoomFit={false}
            settingsMenu={false}
            invertedColors={true}
            xAxisLabel={'x'}
            yAxisLabel={'y'}
            xAxisStep={1}
            yAxisStep={1}
            xAxisArrowMode={"POSITIVE"}
            yAxisArrowMode={"POSITIVE"}
        >
            <Figure r={fetcher.r}/>
            <Points points={fetcher.results} r={fetcher.r}/>
        </GraphingCalculator>
    );
}

function Points({points, r}) {
    const colorHit = '#c200c2';
    const colorMiss = '#00c9c2';
    const colorHitInactive = '#d292d2';
    const colorMissInactive = '#82c4c3';
    const colorPicker = {
        true: {
            true: colorHit,
            false: colorMiss
        },
        false: {
            true: colorHitInactive,
            false: colorMissInactive
        }
    }

    const rendered = points.map((point, i) =>
        <Expression key={i} id={i} latex={`(${point.x}, ${point.y})`}
                    color={colorPicker[point.r === r][point.result]} lines={false}/>
    );

    return (<>{rendered}</>);
}


function Figure({r}) {
    const color = '#ff7000';

    return (<>
        <Expression id={'g1'} latex={`0<=y<=${r} \\{-${r}<=x<=0\\}`} color={color} lines={false}/>
        <Expression id={'g3'} latex={`x^2+y^2<=${r}^2 \\{x<=0\\} \\{y<=0\\}`} color={color} lines={false}/>
        <Expression id={'g2'} latex={`x-${r}<=y<=0 \\{x>=0\\}`} color={color} lines={false}/>

        <Expression id={'-g1'} latex={`-${-r}<=y<=0 \\{0<=x<=${-r}\\}`} color={color} lines={false}/>
        <Expression id={'-g3'} latex={`x^2+y^2<=${-r}^2 \\{x>=0\\} \\{y>=0\\}`} color={color} lines={false}/>
        <Expression id={'-g2'} latex={`0<=y<=x+${-r} \\{x<=0\\}`} color={color} lines={false}/>
    </>);
}

export default Graph;