import "./pagination.css";
import React from "react";
import ArrowRight from "../../assets/arrow-right.png";
import ArrowLeft from "../../assets/arrow-left.png";

function Pagination(props) {
  const { totalPages, setCurrentPage, currentPage } = props;

  const pages = [];
  const buildPages = (total) => {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  };

  buildPages(totalPages);
  return totalPages ? (
    <div className="Pagination">
      <div className="placeholder">
        {pages.map((page) => {
          return (
            <>
              {totalPages > 2 && currentPage !== 1 ? (
                <span>
                  <img
                    src={ArrowLeft}
                    alt="arrow for changing page"
                    onClick={() => {
                      if (totalPages !== currentPage) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  />
                </span>
              ) : (
                ""
              )}
              <span
                className={currentPage === page ? "current" : ""}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </span>
            </>
          );
        })}
        <span>
          <img
            src={ArrowRight}
            alt="arrow for changing page"
            onClick={() => {
              if (totalPages !== currentPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
          />
        </span>
      </div>
    </div>
  ) : (
    <div className="placeholder">
      <span>1</span> <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <img src={ArrowRight} alt="arrow for changing page" />
    </div>
  );
}

export default Pagination;
