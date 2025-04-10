import { LuStar } from "react-icons/lu";

interface StarRatingProps {
  rating?: number;
  max?: number;
  count?: number;
}
const StarRating = ({ rating = 4, max = 5, count }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalf = index === Math.floor(rating) && rating % 1 !== 0;

        return (
          <div key={index} className="relative">
            <LuStar
              stroke="currentColor"
              strokeWidth={1.5}
              size={18}
              className="text-gray-300"
            />
            {isFilled && (
              <LuStar
                fill="yellow"
                strokeWidth={0}
                size={18}
                className="absolute inset-0"
              />
            )}
            {isHalf && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <LuStar fill="yellow" strokeWidth={0} size={18} />
              </div>
            )}
          </div>
        );
      })}
      {count !== undefined && (
        <p className="text-sm text-gray-600">({count.toLocaleString()})</p>
      )}
    </div>
  );
};

export default StarRating;
