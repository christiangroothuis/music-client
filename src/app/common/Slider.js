import React, { useRef } from "react";

function Slider({
    min = 0,
    max = 1,
    value = 0,
    onChange = () => { },
    onChangeStart = () => { },
    onChangeComplete = () => { }
}) {
    const slider = useRef(null);
    const track = useRef(null);
    const thumb = useRef(null);

    let rvalue = value;

    let frac = (rvalue - min) / (max - min);

    const valueFn = function (_value) {
        if (_value === undefined) return rvalue;

        _value = Math.max(min, Math.min(max, _value));

        rvalue = _value;

        onChange(rvalue);
        return rvalue;
    };

    let mousedown = false;
    let cachedLeft;
    let cachedWidth;

    const start = e => {
        e.preventDefault();

        document.addEventListener("mouseup", stop);
        document.addEventListener("touchend", stop);

        mousedown = true;

        const rect = slider.current.getBoundingClientRect();

        let xOffset = window.pageXOffset;

        cachedLeft = rect.left + xOffset;
        cachedWidth = rect.width;

        const frac = Math.min(1, Math.max((e.pageX - cachedLeft) / cachedWidth, 0));
        onChangeStart(valueFn((1 - frac) * min + frac * max));
        slider.current.className += " dragging";
    };

    const stop = () => {
        document.removeEventListener("mouseup", stop);
        document.removeEventListener("touchend", stop);

        mousedown = false;
        cachedLeft = undefined;
        cachedWidth = undefined;

        slider.current.className = "slider";

        onChangeComplete(valueFn());
    };

    const setValueFromPageX = function (pageX) {
        const frac = Math.min(1, Math.max((pageX - cachedLeft) / cachedWidth, 0));
        valueFn((1 - frac) * min + frac * max);
    };

    document.addEventListener("mousemove", function (e) {
        if (!mousedown) return;
        e.preventDefault();
        setValueFromPageX(e.pageX);
    });

    document.addEventListener("touchmove", function (e) {
        if (!mousedown) return;
        e.preventDefault();
        setValueFromPageX(e.changedTouches[0].pageX);
    });

    slider.current &&
        slider.current.addEventListener("mouseup", function (e) {
            if (!mousedown) return;
            e.preventDefault();
            setValueFromPageX(e.pageX);
        });

    slider.current &&
        slider.current.addEventListener("touchend", function (e) {
            if (!mousedown) return;
            e.preventDefault();
            setValueFromPageX(e.changedTouches[0].pageX);
        });

    return (
        <div
            className="slider"
            ref={slider}
            onMouseDown={start}
        >
            <div className="slider__bg middle-align">
                <div className="track-wrapper">
                    <div className="track" ref={track} style={{ transform: `translate(${frac * 100 - 100}%)` }} />
                </div>
                <button onTouchStart={start} className="thumb middle-align" ref={thumb} style={{ left: `${frac * 100}%` }} >
                    <div className="thumb__bg"></div>
                </button>
            </div>
        </div>
    );
}

export default Slider;
