import { CDN_RES_IMG } from "./utils/constants";
const RestaurantCard = (props) => {
  const { name, cuisines, avgRating, sla, cloudinaryImageId } =
    props.resData.info;
  return (
    <>
      <div className="flex flex-col bg-rose-100  border-black rounded-md  h-[400px] w-[300px] border-2 hover:opacity-100  hover:border-8 hover:ease-in-out duration-300">
        <img
          className=" h-[200px] w-[300px] "
          src={CDN_RES_IMG + cloudinaryImageId}
          alt=""
        />

        <div className=" flex flex-col  mt-3 p-2">
          <h3 className="font-bold mb-2">{name}</h3>{" "}
          <p className="my-2 ">{cuisines.join(", ")}</p>{" "}
          <p className="my-2 ">{avgRating} stars</p>
          <p>{sla.deliveryTime} mins</p>
        </div>
      </div>
    </>
  );
};

export const withPromotedLabel = (RestaurentCard) => {
  return (props) => {
    return (
      <div>
        <div>
          <label className=" absolute -mt-3 mx-4 bg-purple-900 text-white rounded-md p-1 hover:opacity-100">
            Promoted
          </label>
        </div>
        <RestaurentCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
