const FooterSection = () => {

    return (

        <section className="max-w-6xl mx-auto py-24">

            <div className="bg-indigo-700 rounded-3xl p-16 flex justify-between items-center">

                <div>

                    <h2 className="text-white text-4xl font-bold">

                        The city's finest,
                        in your pocket.

                    </h2>

                    <p className="text-indigo-100 mt-4">

                        Download the app and enjoy seamless dining.

                    </p>

                </div>

                <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center">

                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Google Play Store"
                        className="h-24"

                    />

                </div>

            </div>

        </section>

    );

};



export default FooterSection;