import React from "react";

type Props = {
  email: string;
  website: string;
  location: string;
  resumeUrl: string;
  resumeDownloadName?: string;
};

const Contact: React.FC<Props> = ({
  email,
  website,
  location,
  resumeUrl,
  resumeDownloadName = "WeltResume (1).pdf",
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">CONTACT</h2>
      <div className="w-16 h-px bg-black mx-auto" />
    </div>

    <div className="grid lg:grid-cols-2 gap-16">
      <div>
        <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
          I'm always interested in new opportunities and collaborations. Let's connect and discuss how I
          can contribute to your next project.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">EMAIL</h3>
            <a href={`mailto:${email}`} className="text-black hover:text-gray-600 transition-colors">
              {email}
            </a>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">LANGUAGES</h3>
            <p className="text-gray-800">English, Levantine Arabic (Conversational)</p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">LOCATION</h3>
            <p className="text-gray-800">{location}</p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white p-12">
        <h3 className="text-2xl font-light mb-6 tracking-wide">LET'S COLLABORATE</h3>
        <p className="text-gray-300 font-light leading-relaxed mb-8">
          Ready to bring your ideas to life with modern web technologies.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wider text-sm uppercase text-center"
          >
            Start Conversation
          </a>

          <button
            type="button"
            onClick={() => {
              const url = resumeUrl;
              window.open(url, "_blank", "noopener,noreferrer");
              const a = document.createElement("a");
              a.href = url;
              a.setAttribute("download", resumeDownloadName || "resume.pdf");
              document.body.appendChild(a);
              a.click();
              a.remove();
            }}
            className="inline-block bg-white text-black px-8 py-3 hover:bg-white/90 transition-all duration-300 font-light tracking-wider text-sm uppercase text-center"
          >
            View / Download Resume
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
