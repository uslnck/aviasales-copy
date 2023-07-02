import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/filters-slice";
import classNames from "classnames";
import "./filters.scss";
import { RootState } from "../../store";

function Filters() {
  const dispatch = useDispatch();
  const { selectedFilter } = useSelector((state: RootState) => state.filters);

  const buttons = [
    { id: 0, label: "САМЫЙ ДЕШЕВЫЙ", filter: "cheapest" },
    { id: 1, label: "САМЫЙ БЫСТРЫЙ", filter: "fastest" },
    { id: 2, label: "ОПТИМАЛЬНЫЙ", filter: "optimal" },
  ];

  const handleClick = (buttonId: number) => {
    dispatch(setFilter({ filter: buttons[buttonId].filter }));
  };

  return (
    <div className="costs">
      <ul className="filters">
        {buttons.map((button) => (
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
