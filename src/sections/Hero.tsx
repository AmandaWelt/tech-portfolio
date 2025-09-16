import React from "react";
import mLogo from '../Assets/m.png';

type Props = {
  logoSrc: string;
};

const Hero: React.FC<Props> = ({ logoSrc }) => {
  return (
    <div className="relative bg-black">
      <div className="mx-auto text-center">
        <div className="mb-10 mx-auto w-[35%] sm:w-[50%] md:w-[55%] h-auto object-contain select-none pointer-events-none">
          <img
            src={mLogo}
            alt="Amanda Welt monogram"
            className="mx-auto w-[35%] sm:w-[50%] md:w-[55%] h-auto object-contain select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>

        <p className="
          text-sm sm:text-base md:text-xl lg:text-2xl
          2xl:text-3xl min-[2560px]:text-4xl ultra:text-4xl
          text-gray-400 font-light tracking-wide">
          JUNIOR DEVELOPER | REACT.JS | TYPESCRIPT
        </p>


        <div className="mx-auto my-6 h-px w-24 md:w-32 bg-gray-400" />

        <p className="
          mx-auto
          text-sm sm:text-base md:text-lg lg:text-xl
          2xl:text-2xl 3xl:text-3xl 4xl:text-4xl ultra:text-6xl min-[2560px]:text-[28px]
          text-gray-300 pb-3 font-light leading-relaxed pb-3
        ">
          Full-Stack Developer specializing in React, TypeScript, and modern web technologies.
          Successfully delivered multiple production MVPs including AI-powered applications.
          Former military intelligence professional bringing analytical thinking and precision to software development.
        </p>

      </div>
    </div>
  );
};

export default Hero;
