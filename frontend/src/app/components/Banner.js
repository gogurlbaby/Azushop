import React from "react";

function Banner({ title, subtitle }) {
  return (
    <div className="bg-[linear-gradient(90deg,#01589A_0%,#009CDE_100%)] w-full h-[19.75rem] flex justify-center items-center px-2">
      <div>
        <h1 className="text-white font-serif font-bold lg:text-7xl text-5xl leading-20 tracking-wide text-center">
          {title}
        </h1>
        <p
          className="text-white font-bold font-serif text-xl leading-10 text-center"
          style={{ marginTop: "1.5rem" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Banner;
