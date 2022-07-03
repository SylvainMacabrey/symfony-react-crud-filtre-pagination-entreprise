import React from 'react';

const Pagination = ({ totalPage, handleChangePage, currentPage }) => {
    let paginations = [];
    for(let i = 1; i <= totalPage; i++) {
        let classPageItem = "page-item";
        if(i === currentPage) {
            classPageItem += " active";
        }
        paginations.push(<li key={ i } className={ classPageItem } onClick={ () => handleChangePage(i) }><p className="page-link">{ i }</p></li>);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                { currentPage > 1 && <li className="page-item" onClick={ () => handleChangePage(currentPage - 1) }><p className="page-link">Previous</p></li>}
                { paginations }
                { currentPage < totalPage && <li className="page-item" onClick={ () => handleChangePage(currentPage + 1) }><p className="page-link">Next</p></li>}
            </ul>
        </nav>
    )
}

export default Pagination;