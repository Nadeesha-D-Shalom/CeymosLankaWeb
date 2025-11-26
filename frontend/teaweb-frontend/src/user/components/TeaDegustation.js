import React, { useEffect, useRef, useState } from "react";
import td1 from "../assets/HomePage/td1.png";
import td2 from "../assets/HomePage/td2.jpg";
import td3 from "../assets/HomePage/td3.jpg";
import td4 from "../assets/HomePage/td4.jpg";
import tdBg from "../assets/HomePage/td-bg.png";

export default function TeaDegustation() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imgRefs = useRef([]);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer
    useEffect(() => {
        const sectionElement = sectionRef.current; // store stable reference

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true);
                else setIsVisible(false);
            },
            { threshold: 0.3 }
        );

        if (sectionElement) observer.observe(sectionElement);

        return () => {
            if (sectionElement) observer.unobserve(sectionElement);
        };
    }, []);


    return (
        <section
            ref={sectionRef}
            className="w-full py-28 bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{ backgroundImage: `url(${tdBg})` }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-8">

                {/* LEFT TEXT */}
                <div
                    ref={textRef}
                    className={`
            md:w-1/2 transition-all duration-[1000ms] ease-out 
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-[#3A2F2A] mb-10 leading-tight">
                        Tea Degustation
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        Discover the true essence of Ceylon tea through our curated
                        degustation sessions. Experience different tea varieties, learn
                        about flavour notes, brewing mastery, and how Sri Lanka’s unique
                        terroir shapes every cup — a refined journey into tradition and
                        craftsmanship.
                    </p>
                </div>

                {/* RIGHT IMAGES */}
                <div className="md:w-1/2 grid grid-cols-2 gap-6">
                    {[td1, td2, td3, td4].map((img, i) => (
                        <img
                            key={i}
                            ref={(el) => (imgRefs.current[i] = el)}
                            src={img}
                            alt="Tea"
                            className={`
                rounded-lg shadow-md object-cover w-full h-48 
                transition-all duration-[900ms] ease-out
                delay-[${i * 150}ms]
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
