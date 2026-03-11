import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const slides = [
  {
    title:
      "Do not go gentle into that good night, Old age should burn and rave at close of day Rage, rage against the dying of the light.",
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

const formatIndex = (index: number) => (index + 1).toString().padStart(2, "0");

const Slides = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sliderImagesRef = useRef<HTMLDivElement | null>(null);
  const sliderTitleRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let activeSlide = 0;
    let currentSplit: SplitText | null = null;

    const rootEl = rootRef.current;
    const sliderImages = sliderImagesRef.current;
    const sliderTitle = sliderTitleRef.current;
    const progressBar = progressBarRef.current;

    if (!rootEl || !sliderImages || !sliderTitle || !progressBar) return;

    const ctx = gsap.context(() => {
      const sliderIndices = rootEl.querySelector(".slider-indices");
      if (!sliderIndices) return;

      const createIndicators = () => {
        const indicators = sliderIndices.querySelectorAll("p");
        indicators.forEach((indicator, index) => {
          const indexEl = indicator.querySelector(".index");
          const markerEl = indicator.querySelector(".marker");

          if (indexEl && markerEl) {
            if (index === 0) {
              gsap.set(indexEl, { opacity: 1 });
              gsap.set(markerEl, { scaleX: 1 });
            } else {
              gsap.set(indexEl, { opacity: 0.35 });
              gsap.set(markerEl, { scaleX: 0 });
            }
          }
        });
      };

      const animateIndicators = (index: number) => {
        const indicators = sliderIndices.querySelectorAll("p");
        indicators.forEach((indicator, i) => {
          const markerEl = indicator.querySelector(".marker");
          const indexEl = indicator.querySelector(".index");
          if (!markerEl || !indexEl) return;

          if (i === index) {
            gsap.to(indexEl, { opacity: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(markerEl, { scaleX: 1, duration: 0.3, ease: "power2.out" });
          } else {
            gsap.to(indexEl, {
              opacity: 0.5,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(markerEl, { scaleX: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      };

      const animateNewTitle = (index: number) => {
        if (currentSplit) {
          currentSplit.revert();
          currentSplit = null;
        }

        sliderTitle.innerHTML = `<h1 class="text-5xl tracking-tight">${slides[index].title}</h1>`;

        currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        gsap.set(currentSplit.lines, { yPercent: 100, opacity: 0 });

        gsap.to(currentSplit.lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
      };

      const animateNewSlide = (index: number) => {
        const newImage = document.createElement("img");
        newImage.src = `${import.meta.env.BASE_URL}${slides[index].image}`;
        newImage.alt = `Slide ${index + 1}`;
        newImage.className =
          "w-full h-full object-cover absolute inset-0 origin-center will-change-[transform,opacity]";

        gsap.set(newImage, { opacity: 0, scale: 1.1 });
        sliderImages.appendChild(newImage);

        gsap.to(newImage, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(newImage, { scale: 1, duration: 1, ease: "power2.out" });

        const allImages = sliderImages.querySelectorAll("img");
        if (allImages.length > 3) {
          const removeCount = allImages.length - 3;
          for (let i = 0; i < removeCount; i += 1) {
            sliderImages.removeChild(allImages[i]);
          }
        }

        animateNewTitle(index);
        animateIndicators(index);
      };

      createIndicators();
      animateNewSlide(0);
      animateIndicators(0);
      animateNewTitle(0);

      const pinDistance = window.innerHeight * slides.length;

      ScrollTrigger.create({
        trigger: rootEl,
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          gsap.set(progressBar, { scaleY: self.progress });

          const currentSlide = Math.floor(self.progress * slides.length);
          if (activeSlide !== currentSlide && currentSlide < slides.length) {
            activeSlide = currentSlide;
            animateNewSlide(activeSlide);
          }
        },
      });
    }, rootEl);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (currentSplit) currentSplit.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="slider h-screen relative overflow-hidden">
      <div
        ref={sliderImagesRef}
        className="slider-images absolute w-full h-full after:content-[''] after:absolute after:inset-0 after:bg-black/35"
      />

      <div className="absolute bottom-0 left-0 w-full">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto px-8 py-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div
            ref={sliderTitleRef}
            className="slider-title max-w-xl text-white"
          />

          <div className="flex w-full md:w-auto items-end justify-between gap-6">
            <div className="slider-indicator flex items-end gap-4">
              <div className="slider-indices flex flex-col gap-2 p-2 justify-between">
                {slides.map((_, idx) => (
                  <p
                    key={idx}
                    data-index={idx}
                    className="flex items-center gap-2"
                  >
                    <span className="marker h-1 w-8 bg-white origin-left" />
                    <span className="index flex gap-1 text-white">
                      {formatIndex(idx)}
                    </span>
                  </p>
                ))}
              </div>

              <div className="slider-progress-bar relative h-[18vh] w-1 bg-white/40">
                <div
                  ref={progressBarRef}
                  className="slider-progress absolute inset-0 bg-white origin-top scale-y-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slides;
