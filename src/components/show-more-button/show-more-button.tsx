import { useDispatch } from "react-redux";
import { increaseDisplayCount } from "../../store/tickets-slice";
import "./show-more-button.scss";

function ShowMoreButton() {
  const dispatch = useDispatch();

  const handleLoadMore = (): void => {
    dispatch(increaseDisplayCount());
  };

  return (
    <button className="more-tickets" onClick={() => handleLoadMore()}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </button>
  );
}

export default ShowMoreButton;
