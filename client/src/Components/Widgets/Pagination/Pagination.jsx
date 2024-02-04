import './Pagination.css'
import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}



export default function Pagination({
  totalPosts, 
  postsPerPage, 
  setCurrentPage, 
  currentPage}) {

  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i);
  }

  return (
    <div className="pagination">
      {
        
        pages.map((page, index) => {
          return(
            <button 
            key={index} 
            onClick={() => setCurrentPage(page) } 
            className={page== currentPage? 'active' : ''}>
                {page}
            </button>
            )
        })
      }
    </div>
  )
}
