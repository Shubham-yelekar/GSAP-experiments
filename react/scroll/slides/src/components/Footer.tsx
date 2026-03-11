import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { label: "PROJECTS DELIVERED", value: 150 },
  { label: "INDUSTRY AWARDS WON", value: 25 },
  { label: "INDUSTRY AWARDS WON", value: 25 },
  { label: "MINUTES OF CGI RENDERED", value: 500000 },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = footerRef.current;
    if (!container) return;

    const elements =
      container.querySelectorAll<HTMLSpanElement>(".stat-counter");

    elements.forEach((el) => {
      const target = Number(el.dataset.target || "0");

      gsap.from(el, {
        textContent: 0,
        duration: 2,
        ease: "power3.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          once: true,
        },
        onUpdate: () => {
          const current = parseInt(el.textContent || "0", 10);
          el.textContent = current.toLocaleString("en-US");
        },
        onComplete: () => {
          el.textContent = target.toLocaleString("en-US");
        },
        delay: 0.1,
      });

      // value must be set back to the target at the end (sometimes rounding can stop short)
      el.dataset.target = String(target);
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="h-screen bg-black text-white flex items-center justify-center"
    >
      <div className="max-w-6xl w-full px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-5xl font-semibold tracking-tight">
                <span className="stat-counter" data-target={stat.value}>
                  0
                </span>
                <span className="ml-2 text-4xl">+</span>
              </div>
              <div className="text-xs tracking-widest text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
