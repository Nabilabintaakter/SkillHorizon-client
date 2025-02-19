import React from 'react';

const AboutTab = ({ name, email }) => {
  return (
    <div className="mt-4 md:mt-0 p-6 lg:ml-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-[#139196]">About Me</h3>
      <p className="text-gray-700 leading-relaxed">
        I'm a passionate and creative web developer with a strong focus on front-end technologies and user experience. I enjoy building intuitive and visually appealing websites and web applications. My goal is to create digital experiences that are not only functional but also engaging and enjoyable for users.  I'm constantly learning and exploring new technologies to stay up-to-date with the ever-evolving web development landscape.
      </p>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-2 text-[#139196]">Skills</h4>
        <div className="flex flex-wrap gap-2 ">
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">HTML</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">CSS</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">JavaScript</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">React</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">Node.js</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">Tailwind CSS</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">Git</button>
          <button className="px-3 py-1 bg-[#139196] text-white rounded-md text-sm hover:bg-[#107c81] transition cursor-text">Responsive Design</button>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-2 text-[#139196]">Language</h4>
        <p className="text-gray-700">English | Bangla</p>
      </div>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-2 text-[#139196]">Personal Information</h4>
        <p className="text-gray-700"><b>Name:</b> {name}</p>
        <p className="text-gray-700"><b>Email:</b> {email}</p>
        <p className="text-gray-700"><b>Availability:</b> Full Time | Part Time | Remote</p>
        <p className="text-gray-700"><b>Age:</b> 27</p>
        <p className="text-gray-700"><b>Location:</b> Dhaka, Bangladesh</p>
        <p className="text-gray-700"><b>Year Experience:</b> 07 Year Experiences</p>
      </div>
    </div>
  );
};

export default AboutTab;