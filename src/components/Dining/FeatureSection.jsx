const FeatureSection = ({
    image,
    title,
    reverse
}) => {

    return (

        <section className="max-w-6xl mx-auto py-24">

            <div
                className={`grid md:grid-cols-2 gap-16 items-center
                ${reverse ? "md:flex-row-reverse" : ""}`}
            >

                {!reverse && (

                    <div>

                        <img
                            src={image}
                            alt=""
                            className="rounded-3xl shadow-lg"
                        />

                    </div>

                )}

                <div>

                    <h2 className="text-4xl font-bold">

                        {title}

                    </h2>

                    <p className="mt-6 text-gray-600 leading-8">

                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam illum molestiae reiciendis.

                    </p>

                    <ul className="mt-8 space-y-4">

                        <li>✔ Beautiful UI</li>

                        <li>✔ Fast booking</li>

                        <li>✔ Instant confirmation</li>

                        <li>✔ QR enabled</li>

                    </ul>

                </div>

                {reverse && (

                    <div>

                        <img
                            src={image}
                            alt=""
                            className="rounded-3xl shadow-lg"
                        />

                    </div>

                )}

            </div>

        </section>

    );

};

export default FeatureSection;