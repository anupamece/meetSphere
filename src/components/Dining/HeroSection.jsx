const HeroSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-20">

      <div className="relative rounded-3xl overflow-hidden shadow-xl h-[450px]">

  {/* Hero Image */}
  <img
    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    alt="Dining Experience"
    className="w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

    <h1 className="text-5xl font-bold text-white mb-4">
      Seamlessly Crafted
      <br />
      Dining Experiences
    </h1>

    <p className="text-white/90 mb-8 text-lg">
      Discover restaurants, explore menus and reserve your table.
    </p>

    {/* Search Box */}
    <div className="w-full max-w-xl bg-white rounded-full shadow-xl flex items-center px-5 py-3">

      <input
        type="text"
        placeholder="Search for a restaurant..."
        className="flex-1 outline-none text-gray-700 placeholder:text-gray-400"
      />

      <button className="bg-indigo-600 text-white rounded-full px-6 py-2 hover:bg-indigo-700 transition">
        Search
      </button>

    </div>

  </div>

</div>

    </section>
  );
};

export default HeroSection;