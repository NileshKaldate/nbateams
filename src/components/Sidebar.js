import moment from "moment";
import React, { useMemo } from "react";

const Sidebar = ({ id, activeId, handleCancel, games }) => {
  const game = games
    ? games?.find((item) => item.home_team.id == activeId) ??
      games[Math.floor(Math.random() * games?.length)]
    : undefined;
  return (
    <div>
      <div
        className="offcanvas offcanvas-end w-25"
        tabIndex="-1"
        id={`offcanvas${id && id}`}
        data-bs-keyboard="false"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header bg-primary text-white">
          <h5 className="offcanvas-title d-none d-sm-block bold" id="offcanvas">
            {game?.home_team.name}
          </h5>
          <button
            type="button"
            className="btn-close text-reset bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleCancel}
          ></button>
        </div>
        <div className="offcanvas-body px-3">
          <table className="sidebar-table ">
            <thead>
              <tr>
                <td className="text-left w-50">Team Full Name</td>
                <td>{game?.home_team.full_name}</td>
              </tr>
              <tr>
                <td>Totals Games in 2021</td>
                <td>{game?.home_team.full_name}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan="2">Random Game Details :</th>
              </tr>
              <tr>
                <th>Date</th>
                <th>{moment(new Date(game?.date)).format("DD-MM-YYYY")}</th>
              </tr>
              <tr>
                <th>Home Team</th>
                <th>{game?.home_team.name}</th>
              </tr>
              <tr>
                <th>Home Team Score</th>
                <th>{game?.home_team_score}</th>
              </tr>
              <tr>
                <th>Visitor Team</th>
                <th>{game?.visitor_team.name}</th>
              </tr>
              <tr>
                <th>Visitor Team Score</th>
                <th>{game?.visitor_team_score}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
