import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import MenuShimmer from "./menuShimmer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "./utils/cartSlice";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menu, setMenu] = useState([]);
  const [resName, setResName] = useState("");

  // const resId = 808645;
  useEffect(() => {
    fetchResMenu();
  }, []);

  const fetchResMenu = async () => {
    const resMenu = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.022505&lng=72.5713621&restaurantId=" +
        resId
    );
    const jsonMenu = await resMenu.json();

    setResName(jsonMenu.data.cards[0].card.card.info.name);
    console.log(resName);

    console.log(
      jsonMenu.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        .itemCards
    );
    if (
      jsonMenu.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        .itemCards == undefined
    ) {
      setMenu(
        jsonMenu.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card
          .card.itemCards
      );
    } else {
      setMenu(
        jsonMenu.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card
          .card.itemCards
      );
    }
  };
  if (!menu) {
    return <h2>Menu not available.</h2>;
  }
  if (menu.length == 0) {
    return <Shimmer />;
  }
  const dispatch = useDispatch();
  const handleAddItem = () => {
    //dispatch action
    dispatch(addItem("pizza"));
  };
  return (
    <>
      <div className="resName">
        <h1>{"<>{" + resName + "}<>"}</h1>

        {menu.map((resMenu) => {
          return (
            <>
              <div className="menuTopContainer">
                <div className="menuContainer">
                  <div className="menuImage">
                    <img
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                        resMenu.card.info.imageId
                      }
                      alt="N/A"
                    />
                  </div>
                  <div className="menuItem" key={resMenu.card.info.id}>
                    <h2>
                      <u>{resMenu.card.info.name}</u>

                      <p>{resMenu.card.info.description}</p>
                      {" " +
                        "$" +
                        (resMenu.card.info.price
                          ? resMenu.card.info.price / 100 / 60
                          : resMenu.card.info.defaultPrice / 100 / 60
                        ).toFixed(2)}
                      <button
                        className="ml-2 border border-l-amber-100 bg-green-200 p-1"
                        onClick={handleAddItem}
                      >
                        Add to cart
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantMenu;
