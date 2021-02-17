import React from 'react'

const Pagination = ({postPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    //Calculating the total number of pages required
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ) {
        pageNumbers.push(i);
    }
    
    return (
        <nav>
            <ul className="pagination">
                {/* map function to paginate from one page to another */}
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;