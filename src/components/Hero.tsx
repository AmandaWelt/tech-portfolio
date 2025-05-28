import React from "react";
import mePic from "../Assets/mepic.jpg";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
} from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.4fr_0.7fr_1fr] w-[80%] gap-8 max-w-7xl mx-auto px-6 py-12 bg-background text-white items-stretch">
      {/* Column 1: Text + Stats */}
      <div className="bg-surface rounded-2xl p-10 flex flex-col justify-between h-full shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-header mb-6 leading-snug break-words">
            Developing your ideas<br />
            from the <span className="bg-accent text-black px-2 py-1 rounded">initial concept</span><br />
            to <span className="bg-accent text-black px-2 py-1 rounded">final execution.</span>
          </h1>


          <a
            href="mailto:mandy@funkyouter.space"
            className="mt-6 px-6 py-2 border border-primary rounded-full text-white font-body hover:shadow-[0_0_12px_#a78bfa] transition inline-block text-center"
          >
            Hire me 👋
          </a>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card border border-white/12 rounded-2xl p-5 text-center text-sm shadow-sm">
            <h2 className="text-3xl font-bold">3+</h2>
            <p className="mt-2 font-body">years of experience</p>
          </div>
          <div className="bg-card border border-white/1 rounded-2xl p-5 text-center text-sm shadow-sm">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="mt-2 font-body">launched MVPs</p>
          </div>
          <div className="bg-card border border-white/12 rounded-2xl p-5 text-center text-sm shadow-sm">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="mt-2 font-body">design systems built</p>
          </div>
        </div>
      </div>

      {/* Column 2: Image */}
      <div className="w-full lg:w-60 h-full rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-surface object-cover glitch-container">
        <img
          src={mePic}
          alt="Amanda Welt"
          className="object-cover w-full h-full filter grayscale glitch-img"
        />
      </div>


      {/* Column 3: Info + Icons */}
      <div className="flex flex-col justify-between h-full">
        <div className="w-full h-full flex flex-col gap-4 text-lg">
          <div className="bg-surface p-4 rounded-2xl flex font-header justify-between items-center h-full w-full shadow-sm">
            <span>who:</span> <strong>Amanda Welt</strong>
          </div>
          <div className="bg-surface p-4 rounded-2xl flex justify-between items-center w-full h-full shadow-sm">
            <span>title:</span> <strong>Junior Developer</strong>
          </div>
          <div className="bg-surface p-4 rounded-2xl flex justify-between items-center w-full h-full shadow-sm">
            <span>based in:</span> <strong>Oklahoma City</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 h-[70%] w-full mt-6">
          <a
            href="https://github.com/AmandaWelt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/10 p-4 rounded-full flex items-center justify-center shadow-[0_0_10px_#a78bfa] hover:scale-105 transition"
          >
            <Github className="text-primary w-6 h-6" />
          </a>

          <a
            href="https://linkedin.com/in/amanda-welt-119b17151/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary/10 p-4 rounded-full flex items-center justify-center shadow-[0_0_10px_#a78bfa] hover:scale-105 transition"
          >
            <Linkedin className="text-primary w-6 h-6" />
          </a>
          <a
            href="mailto:mandy@funkyouter.space"
            className="bg-primary/10 p-4 rounded-full flex items-center justify-center shadow-[0_0_10px_#a78bfa] hover:scale-105 transition"
          >
            <Mail className="text-primary w-6 h-6" />
          </a>
          <a
            href="/AmandaWelt_Resume.pdf"
            download
            className="bg-primary/10 p-4 rounded-full flex items-center justify-center shadow-[0_0_10px_#a78bfa] hover:scale-105 transition"
          >
            <FileText className="text-primary w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
