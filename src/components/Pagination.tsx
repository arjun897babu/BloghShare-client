import React, { MouseEvent } from "react"
import { PaginationProps } from "../utility/types";
import { ButtonDir } from "../constants/enum";

const Pagination: React.FC<PaginationProps> = ({ pageNumber, changePage, totalPage }) => {

    function change(e: MouseEvent<HTMLButtonElement>, dir:ButtonDir ) {
        e.preventDefault();
        const newPage = dir === 'next' ? pageNumber + 1 : pageNumber - 1
        changePage(newPage)

    }

    return (
        <div className="join mb-5">
            {pageNumber > Math.min(pageNumber, 1) &&
                <button onClick={(e) => change(e, ButtonDir.PREV)} className="join-item btn btn-neutral p-2">«</button>
            }

            <button className="join-item btn bg-gradient-to-bl from-emerald-400 to-emerald-600 mx-0.5">Page{pageNumber}</button>
            {
                pageNumber < Math.max(pageNumber, totalPage) &&
                <button onClick={(e) => change(e,ButtonDir.NEXT)} className="join-item btn btn-neutral p-2">»</button>
            }

        </div>
    )
}

export default Pagination