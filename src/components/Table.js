import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Table = ({ teams, games, search }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [sort, setSort] = useState(0);
  const [count, setCount] = useState(0);

  const sortedData =
    sort === 1
      ? teams?.sort((a, b) => {
          if (a.city < b.city) {
            return -1;
          }
          if (a.city > b.city) {
            return 1;
          }
          return 0;
        })
      : sort === 2
      ? teams?.sort((a, b) => {
          if (a.city > b.city) {
            return -1;
          }
          if (a.city < b.city) {
            return 1;
          }
          return 0;
        })
      : teams;

  const data = search
    ? sortedData?.filter((item) =>
        item.city.toLowerCase().includes(search.toLowerCase())
      )
    : sortedData;
  const paginatedData = data?.slice(currentPage * 7, (currentPage + 1) * 7);
  const [activeId, setActiveId] = useState(-1);

  const handleCancel = () => {
    setActiveId(-1);
  };

  useEffect(() => {
    count === 0 && setCurrentPage(prevPage);
    count === 1 && setCurrentPage(0);
  }, [count]);

  useEffect(() => {
    count === 0 && setPrevPage(currentPage);
    search ? setCount(count + 1) : setCount(0);
  }, [search]);

  return (
    <div>
      <div style={{ height: "350px" }}>
        <table className="table table-hover mt-4">
          <thead>
            <tr className="table-head bg-primary text-white py-10">
              <th className="text-center">Team Name</th>
              <th className="text-center">
                City{" "}
                {sort === 0 || sort === 2 ? (
                  <i
                    className="bi bi-caret-up-fill"
                    onClick={() => setSort(1)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-caret-down-fill"
                    onClick={() => setSort(2)}
                  ></i>
                )}
              </th>
              <th className="text-center">Abbreviation</th>
              <th className="text-center">Conference</th>
              <th className="text-center">Division</th>
            </tr>
          </thead>
          <tbody className="border-none">
            {paginatedData?.map((item) => {
              return (
                <tr
                  data-bs-toggle="offcanvas"
                  data-bs-target={`#offcanvas${item.id}`}
                  role="button"
                  className={`${item.id === activeId ? "table-active" : ""}`}
                  onClick={() => {
                    activeId !== item.id
                      ? setActiveId(item.id)
                      : setActiveId(-1);
                  }}
                  key={item.id}
                >
                  <td className="text-center ">{item.name}</td>
                  <td className="text-center">{item.city}</td>
                  <td className="text-center">{item.abbreviation}</td>
                  <td className="text-center">{item.conference}</td>
                  <td className="text-center">
                    {item.division}{" "}
                    <Sidebar
                      id={item.id}
                      activeId={activeId}
                      handleCancel={handleCancel}
                      games={games}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <nav aria-label="Page navigation example">
          <ul className="pagination gap-4">
            <li className="page-item">
              <button
                className="page-link bg-primary text-white"
                aria-label="Previous"
                onClick={() => {
                  currentPage > 0 && setCurrentPage(currentPage - 1);
                }}
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
            <li className="page-item ">
              <button
                className="page-link bg-primary text-white"
                onClick={() => {
                  setCurrentPage(0);
                }}
              >
                1
              </button>
            </li>
            {data?.length > 7 && (
              <li className="page-item">
                <button
                  className="page-link bg-primary text-white"
                  onClick={() => {
                    setCurrentPage(Math.ceil(data?.length / 7) - 1);
                  }}
                >
                  {Math.ceil(data?.length / 7)}
                </button>
              </li>
            )}
            <li className="page-item">
              <button
                className="page-link bg-primary text-white"
                aria-label="Next"
                onClick={() => {
                  currentPage !== Math.ceil(data?.length / 7) - 1 &&
                    setCurrentPage(currentPage + 1);
                }}
              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
