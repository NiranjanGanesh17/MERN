import React from 'react';
import '../styles/pagination.css';

function Paginate({ postsPerPage, totalPosts, paginator }) {

    var pageNumbers = [];

    if (Math.ceil(totalPosts / postsPerPage) > 1) {
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i)
        }
    }
    else { return null };

    return (


        <div id='paginate'>

            { pageNumbers.map((num) => {
                return (<nav aria-label="Page navigation example">
                    <ul class="pagination">

                        <li class="page-item"><button id="pgbutton" onClick={() => paginator(num)} class="page-link" >{num}</button></li>

                    </ul>
                </nav>


                )
            })}
        </div>
    )
}

export default Paginate
