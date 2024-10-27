import React from "react";
// import './About.css'; // Assuming you have a CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-container mt-5 w-auto mr-20 ml-20 ">
      <div className="flex flex-col gap-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-6xl mt-2 mb-5">About us</h1>

          <p className="mb-2 text-lg font-semibold">
            The tourism industry in Uttarakhand plays a crucial role in the
            local economy, supporting livelihoods, promoting cultural exchange,
            and preserving natural beauty. However, challenges such as seasonal
            disruptions, environmental concerns, and global competition have
            impacted the region’s tourism. Below are innovative solutions to
            uplift the sector:
          </p>
        </div>
        <div className="flex gap-12">
          <section className="flex flex-col gap-6">
            <h2 className="font-bold text-2xl m-2">
              1. Promoting Sustainable and Eco-Tourism
            </h2>
            <p className="text-xl">
              Uttarakhand's abundant natural resources make it an ideal
              destination for eco-tourism. Investing in sustainable practices
              such as eco-friendly accommodations, waste management, and
              responsible travel guidelines will attract environmentally
              conscious travelers. Promoting eco-treks, minimal-impact camping,
              and creating eco-lodges will give the region an edge.
            </p>
          </section>
          <section>
            <img
              className="rounded-lg"
              width={1200}
              src="https://greenerideal.com/wp-content/uploads/2012/10/Eco-tourism.jpg"
              alt=""
            />
          </section>
        </div>
        {/* <section>
        <h2 className='font-bold text-2xl m-2'>2. Diversification of Tourism Packages</h2>
        <p>
          While Uttarakhand is known for religious tourism, such as the Char Dham Yatra, diversifying into adventure tourism (rafting, trekking), wellness tourism (yoga retreats, Ayurveda), and cultural tourism (local arts and crafts) will attract a wider range of tourists. Developing off-season packages like winter sports or cultural festivals will help boost tourism throughout the year.
        </p>
      </section> */}
        <div className="flex gap-4">
          <section>
            <img
              className="rounded-lg"
              width={1200}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgdaqBYDYXbpfWVE-ft5xqPx7HjsMZzJmmQ&s"
              alt=""
            />
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="font-bold text-2xl m-2">
              2. Digital Marketing and Tech Integration
            </h2>
            <p className="text-xl">
              Improving the digital presence of Uttarakhand’s tourism industry
              through well-designed websites, social media campaigns, and
              collaborations with influencers can increase visibility. Utilizing
              augmented reality (AR) apps for virtual tours of key destinations
              can attract tech-savvy travelers, and partnering with platforms
              like Airbnb or Booking.com will help local businesses reach global
              audiences.
            </p>
          </section>
        </div>
        <div className="flex gap-4">
          <section className="flex flex-col gap-6">
            <h2 className="font-bold text-2xl m-2">
              3. Infrastructure Development
            </h2>
            <p className="text-xl">
              Better road connectivity, modern airports, and rail links will
              make the region more accessible. Improving tourist-friendly
              amenities like signboards, rest stops, and internet connectivity
              can significantly enhance the overall travel experience and
              encourage more visits.
            </p>
          </section>
          <section>
            <img
              className="rounded-lg"
              width={900}
              src="https://i0.wp.com/www.xamnation.com/wp-content/uploads/2018/11/urban-infra.jpg?fit=3072%2C2048&ssl=1"
              alt=""
            />
          </section>
        </div>
        <div className="flex gap-4">
        <section>
        <img
              className="rounded-lg"
              width={900}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF29Iu3n7hpojNNx8UnrhjFkwV3ktOgI1mAYn3DcE6CKx1fWnT41lqyF1yQjZ7lw04Toc&usqp=CAU"
              alt=""
            />
            </section>
            <section className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl m-2">
            4. Local Craft and Artisan Promotion
          </h2>
          <p className="text-xl">
            Uttarakhand boasts a rich heritage of crafts, such as woolen
            garments, wooden artifacts, and traditional paintings. Promoting
            these through local markets and online stores can support artisans
            and offer tourists unique products. Offering craft-based workshops
            will add value to the tourism experience.
          </p>
        </section>
        </div>
        <div className="flex gap-4">
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl m-2">
            5. Collaborations with Hospitality and Travel Tech Companies
          </h2>
          <p className="text-xl">
            Partnering with leading hospitality and travel companies can help
            the region market itself better. By offering bundled packages in
            collaboration with platforms like MakeMyTrip or OYO, tourists will
            benefit from seamless booking experiences for accommodations, treks,
            or pilgrimages.
          </p>
        </section>
        <section>
        <img
              className="rounded-lg"
              width={600}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqarSAegtx-1Jrruz0Lrj5WmtwFi9fm0eR5Q&s"
              alt=""
            />
            </section>
        </div>
        {/* <section>
          <h2 className="font-bold text-2xl m-2">
            7. Safety and Hygiene Measures Post-Pandemic
          </h2>
          <p>
            With post-pandemic safety concerns in mind, Uttarakhand’s tourism
            industry must focus on hygiene protocols in hotels, transport, and
            public spaces. Certifying accommodations and services as safe will
            help regain tourist confidence and ensure a smooth recovery.
          </p>
        </section> */}
<div className="flex gap-4">
<section>
        <img
              className="rounded-lg"
              width={900}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcul3_VKcm6-NM4LXeIL7UjBJrVmjcycqsrw&s"
              alt=""
            />
            </section>
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl m-2">
            6. Developing Responsible Adventure Tourism
          </h2>
          <p className="text-xl">
            The Himalayas provide opportunities for adventure tourism, but it
            must be done responsibly. Guidelines for waste disposal, guiding
            numbers, and ensuring safety will minimize the environmental impact
            while offering a thrilling experience to adventure seekers.
          </p>
        </section>
        
            </div>
            <div className="flex gap-4">
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl m-2">
            7. Homestays and Village Tourism
          </h2>
          <p className="text-xl">
            Encouraging homestays in local villages will provide tourists with
            an authentic cultural experience. Training villagers in hospitality
            and eco-friendly practices will promote sustainable tourism while
            supporting rural communities.
          </p>
        </section>
        <section>
        <img
              className="rounded-lg"
              width={600}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDER8eR5tvAnU-s3hA9BcBudpVfsIoSfOyHA&s"
              alt=""
            />
            </section>
            </div>
        <section className="flex flex-col gap-6 mb-12">
          <h2 className="font-bold text-2xl m-2">Conclusion</h2>
          <p className="text-xl">
            The tourism sector in Uttarakhand has immense potential, but it
            needs a multi-faceted approach to fully thrive. By embracing
            sustainability, improving infrastructure, leveraging digital
            marketing, and diversifying tourism packages, the region can enhance
            tourist experiences, create jobs, and maintain ecological balance,
            ensuring it becomes a year-round, eco-friendly destination for
            travelers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;