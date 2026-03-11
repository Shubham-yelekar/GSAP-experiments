const sections = [
  {
    title: "Product Experience",
    items: [
      "3D Configurator",
      "Unreal Engine",
      "Customer Experience Strategy",
      "Webgl",
      "Augmented Reality",
      "Virtual Reality",
      "Metaverse",
    ],
    image: "/picture-1.webp",
  },
  {
    title: "Digital Assets",
    items: [
      "Print Images",
      "CGI Images",
      "CGI Animation Video",
      "CGI Production",
    ],
    image: "/picture-2.webp",
  },
  {
    title: "Artificial Intelligence",
    items: [
      "Content Generation",
      "AI Sales Agents",
      "AI Product Images",
      "AI Product Video",
    ],
    image: "/picture-3.webp",
  },
];

const Intro = () => {
  return (
    <section className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <header className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Our Expertise Is Innovation In Next Gen
            <span className="block text-gray-300">
              Experience That Create Living Conversations
            </span>
            <span className="block text-gray-400">
              Between Products & People.
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-gray-300">
            As a full-service agency, we provide comprehensive design and
            content solutions, emphasizing collaboration and pushing your
            boundaries to help you succeed with faculty.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <div
              key={section.title}
              className="group grid gap-8 md:grid-cols-[2fr_1.2fr_1.8fr] items-center border-t border-white/10 pt-10"
            >
              <div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>

              <ul className="space-y-2 text-sm text-gray-300">
                {section.items.map((item) => (
                  <li key={item} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative overflow-hidden rounded-xl bg-white/5">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
