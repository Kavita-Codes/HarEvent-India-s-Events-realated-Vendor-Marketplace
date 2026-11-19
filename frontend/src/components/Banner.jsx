

const Banner = ({
  title = "India's Most Trusted Online Event Marketplace",
  description,
  image = "/Lavish Red and Gold Wedding Stage.png",
}) => {
  return (
    <section className="relative flex min-h-[200px] items-center justify-center overflow-hidden bg-[#21151f] px-5 py-8 sm:min-h-[200px] lg:min-h-[255px]">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 px-5 text-center">
        <h1 className="text-[24px] font-bold leading-tight text-white sm:text-[30px] lg:text-[32px]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default Banner