import Restaurant, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { mockRestaurants } from "./utils/constants";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);

  const RestaurantPromotedCard = withPromotedLabel(Restaurant);
  useEffect(() => {
    fetchData();
    console.log("useEffect called!");
  }, []);
  let [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0044745&lng=72.55311549999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const fetchedData = await data.json();
    // console.log(fetchedData);

    setResList(
      fetchedData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    console.log(
      fetchedData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredResList(
      fetchedData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };
  if (resList.length == 0) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="bg-gradient-to-r from-lime-50 to-purple-100">
        <div
          className="flex justify-center
        content-around py-2 flex-wrap   mx-3"
        >
          <div className="mx-4">
            <input
              className="border rounded mr-3 px-4 py-2"
              type="text"
              onChange={(e) => {
                // console.log(searchText);
                setSearchText(e.target.value);
                console.log("Hello" + searchText);
              }}
            />
            <button
              className="border-2 black p-2"
              onClick={() => {
                //searching on resList not on filteredResList
                const filteredSearchList = resList.filter((res) => {
                  return res.info.name
                    .toUpperCase()
                    .includes(searchText.toUpperCase());
                });

                setFilteredResList(filteredSearchList);
                // console.log(filteredResList);
              }}
            >
              Search
            </button>
          </div>
          <button
            className="border-2 black p-2"
            onClick={() => {
              //searching on resList not on filteredResLis
              const topRating = resList.filter((res) => {
                return res.info.avgRating > 4.2;
              });
              setFilteredResList(topRating);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex flex-wrap justify-around  ">
          {filteredResList.map((restaurant) => (
            <div className="mt-3 mb-3 border black rounded">
              <Link
                to={"/restaurantmenu/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                {restaurant.info.sla.deliveryTime <= 30 ? (
                  <RestaurantPromotedCard resData={restaurant} />
                ) : (
                  <Restaurant resData={restaurant} />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Body;
