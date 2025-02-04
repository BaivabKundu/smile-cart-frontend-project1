import { useState, useEffect } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);

  const handlePrevious = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <div className="flex flex-col items-center">
        <img
          alt={title}
          className="max-w-90 h-56 max-h-56 w-80 object-contain"
          src={imageUrls[currentIndex]}
        />
        <div className="flex space-x-1">
          {imageUrls.map((_, index) => (
            <span
              key={index}
              className={classNames(
                "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
                { "neeto-ui-bg-black": index === currentIndex }
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
    </div>
  );
};

export default Carousel;
