import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HouseFill } from 'react-bootstrap-icons';

function BreadCrumbNav({ currentItem }) {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(path => path !== '');

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><HouseFill /> Home</Link></li>
                {paths.map((path, index) => (
                    <li className="breadcrumb-item" key={index}>
                        {index === paths.length - 1 ? (
                            <span aria-current="page">{currentItem}</span>
                        ) : (
                            <Link to={`/${paths.slice(0, index + 1).join('/')}`}>{path}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default BreadCrumbNav;
