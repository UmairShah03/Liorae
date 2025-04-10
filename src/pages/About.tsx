import { assets } from "@/assets/frontend_assets/assets";
import NewsletterBox from "@/components/NewsletterBox";
import Title from "@/components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title txt1="ABOUT" txt2="US" />
      </div>
      <div className="flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Liorae is a contemporary clothing brand that redefines everyday
            fashion with a touch of elegance and sophistication. Inspired by
            modern trends and timeless aesthetics, Liorae creates versatile
            pieces designed to empower individuals through style.
          </p>

          <p>
            With a strong commitment to quality, sustainability, and
            craftsmanship, Liorae offers everything from everyday essentials to
            standout statement outfits. Whether you’re dressing for work, a
            casual outing, or a special occasion, Liorae ensures that you look
            and feel confident in every moment.
          </p>
          <b className="text-gray-800">OUR MISSION</b>
          <p>
            At Liorae, our mission is to inspire confidence and individuality
            through thoughtfully designed clothing that celebrates style,
            comfort, and sustainability.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title txt1="WHY" txt2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-1">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>QUALITY ASSURANCE</b>
          <p className="text-gray-600">
            At Liorae, we prioritize exceptional quality by using premium
            fabrics and maintaining rigorous quality control at every step of
            the production process.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>CONVINIENCE</b>
          <p className="text-gray-600">
            Liorae is dedicated to providing a seamless shopping experience with
            easy navigation, secure checkout, and fast, reliable delivery right
            to your doorstep.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>EXCEPTIONAL CUSTOMER SERVICE</b>
          <p className="text-gray-600">
            Our team at Liorae is committed to delivering exceptional service,
            offering personalized support, timely responses, and a
            customer-first approach to ensure your satisfaction at every step.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
