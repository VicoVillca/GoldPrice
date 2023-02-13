import React from "react";

// reactstrap components
import {
  Card,

  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

// core components

const items = [
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTiBUVsE_QO-P6x02WjvGxiI_GCOD0bTNqq7xEgGNWrqY0ck0fdFdGoFc87hnLMOIxmJRoXuDZMAmOu_YAQtdRduZ5magTCJrlezOsL6YQmpM0SOAG6HevoIrs07vlBKXorzsIfN_duA2dIy28LZP9wEDWni5CK0RxuOLMo-kujtvvO7NXmMVz7RKmNw/s16000/Frx-PvqEgd79UMv_RpFy_QtaYMiz.png",
    altText: "Somewhere",
    caption: "Somewhere",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTiBUVsE_QO-P6x02WjvGxiI_GCOD0bTNqq7xEgGNWrqY0ck0fdFdGoFc87hnLMOIxmJRoXuDZMAmOu_YAQtdRduZ5magTCJrlezOsL6YQmpM0SOAG6HevoIrs07vlBKXorzsIfN_duA2dIy28LZP9wEDWni5CK0RxuOLMo-kujtvvO7NXmMVz7RKmNw/s16000/Frx-PvqEgd79UMv_RpFy_QtaYMiz.png",
    altText: "Somewhere",
    caption: "Somewhere",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTiBUVsE_QO-P6x02WjvGxiI_GCOD0bTNqq7xEgGNWrqY0ck0fdFdGoFc87hnLMOIxmJRoXuDZMAmOu_YAQtdRduZ5magTCJrlezOsL6YQmpM0SOAG6HevoIrs07vlBKXorzsIfN_duA2dIy28LZP9wEDWni5CK0RxuOLMo-kujtvvO7NXmMVz7RKmNw/s16000/Frx-PvqEgd79UMv_RpFy_QtaYMiz.png",
    altText: "Somewhere",
    caption: "Somewhere",
  },
];

function SectionCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <Card className="page-carousel">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map((item,index) => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              key={index}
            >
              <img src={item.src} alt={item.altText} />
              <CarouselCaption captionText={item.caption} captionHeader="" />
            </CarouselItem>
          );
        })}
        <a
          className="left carousel-control carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            previous();
          }}
          role="button"
        >
          <span className="fa fa-angle-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control carousel-control-next"
          data-slide="next"
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <span className="fa fa-angle-right" />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    </Card>
  );
}

export default SectionCarousel;
