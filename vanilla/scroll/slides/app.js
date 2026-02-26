// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // gsap code here!
  // Initialize Lenis
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  gsap.ticker.lagSmoothing(0);

  const slides = [
    {
      title:
        "Do not go gentle into that good night,Old age should burn and rave at close of day Rage, rage against the dying of the light.",
      image: "picture-1.webp",
    },
    {
      title:
        "Though wise men at their end know dark is right, Because their words had forked no lightning they , Do not go gentle into that good night.",
      image: "picture-2.webp",
    },
    {
      title:
        "Good men, the last wave by, crying how bright ,Their frail deeds might have danced in a green bay, Rage, rage against the dying of the light.",
      image: "picture-3.webp",
    },
    {
      title:
        "Wild men who caught and sang the sun in flight, And learn, too late, they grieved it on its way, Do not go gentle into that good night.",
      image: "picture-4.webp",
    },
  ];

  const pinDistance = window.innerHeight * slides.length;
  const progressBar = document.querySelector(".slider-progress");
  const sliderImages = document.querySelector(".slider-images");
  const sliderTitle = document.querySelector(".slider-title");
  const sliderIndices = document.querySelector(".slider-indices");

  let activeSlide = 0;
  let currentSplit = null;

  function createIndices() {
    sliderIndices.innerHTML = "";

    slides.forEach((_, index) => {
      const indexNum = (index + 1).toString().padStart(2, "0");
      const indicatorElement = document.createElement("p");
      indicatorElement.dataset.index = index;

      indicatorElement.innerHTML = `<span class="marker h-1 w-8 bg-white"></span><span class="index flex align-items gap-1 text-white">${indexNum}</span>`;

      sliderIndices.appendChild(indicatorElement);

      if (index === 0) {
        gsap.set(indicatorElement.querySelector(".index"), {
          opacity: 1,
        });

        gsap.set(indicatorElement.querySelector(".marker"), {
          scaleX: 1,
        });
      } else {
        gsap.set(indicatorElement.querySelector(".index"), {
          opacity: 0.35,
        });

        gsap.set(indicatorElement.querySelector(".marker"), {
          scaleX: 0,
        });
      }
    });
  }

  function animateNewSlide(index) {
    const newSliderImage = document.createElement("img");
    newSliderImage.src = `./assets/${slides[index].image}`;
    newSliderImage.alt = `Slide ${index + 1}`;
    newSliderImage.classList =
      "w-full h-full object-cover absolute inset-0 origin-center will-change-[transform,opacity]";

    gsap.set(newSliderImage, {
      opacity: 0,
      scale: 1.1,
    });

    sliderImages.appendChild(newSliderImage);

    gsap.to(newSliderImage, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(newSliderImage, {
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });

    const allImages = sliderImages.querySelectorAll("img");

    if (allImages.length > 3) {
      const removeCount = allImages.length - 3;

      for (let i = 0; i < removeCount; i++) {
        sliderImages.removeChild(allImages[i]);
      }
    }

    animateNewTitle(index);
    animateIndicators(index);
  }

  function animateIndicators(index) {
    const indicators = sliderIndices.querySelectorAll("p");

    indicators.forEach((indicator, i) => {
      const markerElement = indicator.querySelector(".marker");
      const indexElement = indicator.querySelector(".index");

      if (i === index) {
        gsap.to(indexElement, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(markerElement, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(indexElement, {
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(markerElement, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }
  function animateNewTitle(index) {
    if (currentSplit) {
      currentSplit.revert();
    }

    sliderTitle.innerHTML = `<h1 class="text-5xl tracking-tight" >${slides[index].title}</h1>`;

    currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.set(currentSplit.lines, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.to(currentSplit.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  createIndices();

  animateNewSlide(0);
  animateIndicators(0);
  animateNewTitle(0);
  ScrollTrigger.create({
    trigger: ".slider",
    start: "top top",
    end: `+=${pinDistance}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true,

    onUpdate: (self) => {
      gsap.set(progressBar, {
        scaleY: self.progress,
      });

      const currentSlide = Math.floor(self.progress * slides.length);

      if (activeSlide !== currentSlide && currentSlide < slides.length) {
        activeSlide = currentSlide;
        animateNewSlide(activeSlide);
      }
    },
  });
});
