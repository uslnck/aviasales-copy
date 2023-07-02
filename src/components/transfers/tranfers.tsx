import { useDispatch, useSelector } from "react-redux";
import {
  toggleTransfers,
  toggleAllTransfers,
} from "../../store/checkboxes-slice";
import "./tranfers.scss";
import { RootState } from "../../store";

function Transfers() {
  const {
    allTransfersChecked,
    zeroTransfersChecked,
    oneTransferChecked,
    twoTransfersChecked,
    threeTransfersChecked,
  } = useSelector((state: RootState) => state.checkboxes);

  const dispatch = useDispatch();

  const checkboxes = [
    { id: 0, label: "Все", checked: allTransfersChecked },
    { id: 1, label: "Без пересадок", checked: zeroTransfersChecked },
    { id: 2, label: "1 пересадка", checked: oneTransferChecked },
    { id: 3, label: "2 пересадки", checked: twoTransfersChecked },
    { id: 4, label: "3 пересадки", checked: threeTransfersChecked },
  ];

  const handleClick = (checkboxId: number) => {
    if (checkboxId === 0) dispatch(toggleAllTransfers());
    else {
      const checkedCheckbox = checkboxes[checkboxId];
      const restCheckboxes = checkboxes.filter(
        (checkbox) => checkbox.id !== checkboxId && checkbox.id !== 0
      );
      const isCheckAll =
        !checkedCheckbox.checked &&
        restCheckboxes[0].checked &&
        restCheckboxes[1].checked &&
        restCheckboxes[2].checked;
      dispatch(
        toggleTransfers({ all: isCheckAll, checked: checkedCheckbox.id })
      );
    }
  };

  return (
    <div className="transfers">
      <h2 className="header">КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <ul className="checkboxes">
        {checkboxes.map((checkbox) => (
          <li
            className="checkbox"
            onClick={() => handleClick(checkbox.id)}
            key={checkbox.id}
          >
            <input
              key={checkbox.id}
              type="checkbox"
              id={checkbox.id.toString()}
              className="checkbox"
              checked={checkbox.checked}
              readOnly
            />
            <label
              htmlFor={checkbox.id.toString()}
              onClick={(e) => e.stopPropagation()}
            >
              {checkbox.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transfers;
