import { forwardRef, useEffect } from 'react';
import "./ShowHead.css";

const ShowHead = forwardRef(({ adventure, updateWidth, className }, ref) => {
    useEffect(() => {
        updateWidth();
       /*  window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth); */
    }, [updateWidth]);

    return (
        <header className="show-head" ref={ref}>
            <img className={className} src={adventure.images[0]} alt="adventure image" />
            <h1>{adventure.title}</h1>
        </header>
    );
});

ShowHead.displayName = "ShowHead";

export default ShowHead;
