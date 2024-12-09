import React, { MouseEvent } from "react"

type PaginationProps = {
    pageNumber: number,
    changePage: (newPage: number) => void;
    totalPage: number
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, changePage, totalPage }) => {

    function change(e: MouseEvent<HTMLButtonElement>, dir: 'prev' | 'next') {
        e.preventDefault();
        const newPage = dir === 'next' ? pageNumber + 1 : pageNumber - 1
        changePage(newPage)

    }

    return (
        <div className="join mb-5">
            {pageNumber > Math.min(pageNumber, 1) &&
                <button onClick={(e) => change(e, 'prev')} className="join-item btn">«</button>
            }

            <button className="join-item btn">Page{pageNumber}</button>
            {
                pageNumber < Math.max(pageNumber, totalPage) &&
                <button onClick={(e) => change(e, 'next')} className="join-item btn">»</button>
            }

        </div>
    )
}

export default Pagination