import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'

function CardSection({rows, data, link, title}) {
    const mainInnerRef = useRef();
    const [limiter, setLimiter] = useState(0);

    // Calculate how much cards with the gaps (25px) will fit in main div without padding on window resize
    useEffect(() => {
        const handleWindowResize = () => {
            const calculation = Math.floor(
                (mainInnerRef.current.getBoundingClientRect().width + 25) / (164 + 25)
            )
            
            rows && setLimiter(
                calculation < 1 ? rows : calculation * rows
            );
        }

        handleWindowResize()

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [rows])

    let dataShown = data;
    if(rows) dataShown = data.slice(0, limiter);

    return (
        <section className="items-grid" ref={mainInnerRef}>
            <div className="items">
                <div className="top">
                    <div className="title">
                        {link
                            ? <Link className="sectionTitle title-link" to={link}>{title}</Link>
                            : <div className="sectionTitle" to={link}>{title}</div>
                        }
                    </div>
                    {link && <Link className="see-all link-border" to={link}>See all</Link>}
                </div>
                {data && dataShown.map((item, i) => {
                    return (
                        <Card
                            key={i}
                            title={item.name}
                            img={item.img}
                            type={item.type}
                            id={item._id}
                            artists={item.artists}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default CardSection;
