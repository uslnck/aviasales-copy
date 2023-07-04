import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/filters-slice";
import classNames from "classnames";
import "./filters.scss";
import { RootState } from "../../store";
import { filterButtons } from "../../mock/filter-buttons";

function Filters() {
  const dispatch = useDispatch();
  const { selectedFilter } = useSelector((state: RootState) => state.filters);

  const handleClick = (buttonId: number) => {
    dispatch(setFilter({ filter: filterButtons[buttonId].filter }));
  };

  return (
    <div className="costs">
      <ul className="filters">
        {filterButtons.map((button) => (
          <li key={button.id}>
            <button
              key={button.id}
              className={classNames("filter", {
                active: selectedFilter === button.filter,
              })}
              onClick={() => handleClick(button.id)}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
