export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL1 = process.env.NEXT_PUBLIC_BASE_URL1;
export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "approach", link: "#approach" },
  { name: "Contact", link: "#contact" },
];
export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full mt-0",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
    // email: "rangnathan@gmail.com",
  },
  {
    id: 2,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-4",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
    // email: "rangnathan@gmail.com",
  },
  {
    id: 3,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
    // email: "rangnathan@gmail.com",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
    // email: "rangnathan@gmail.com",
  },

  {
    id: 5,
    title: "Currently working in a cloud platform with Next js",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
    email: "rangnathan@gmail.com",
  },
];

export const projects = [
  {
    id: 1,
    title: "Drupal Multipurpose Business Theme",
    description:
      "A professional theme for your business which will cover all your needs to showcase your products/services in ways that will impress your customers",
    projectImage: ["/college-pro.png"],
    languagesUsed: ["Javascript", "react", "drupal", "twig", "next js"],
    link: "https://demo.drupalthemes.io/business-plus/drupal-9-theme/home-1",
  },
  {
    id: 2,
    title: "Modern portfolio app with amazing animation",
    description:
      "This is one of the best portfolio examples if you want to focus on displaying your work and updates and sharing your knowledge",
    projectImage: ["/portfolio-project.png"],
    languagesUsed: ["Javascript", "react", "drupal", "twig", "next js"],
    link: "https://demo.drupalthemes.io/business-plus/drupal-9-theme/home-1",
  },
  {
    id: 3,
    title: "Drupal Multipurpose Consultancy Business Theme",
    description:
      "A great multipurpose theme for consultancies, companies and corporates to showcase their businesses.",
    projectImage: ["/consultancy-plus.png"],

    languagesUsed: ["Next js", "Javascript", "Jquery", "drupal", "twig"],
    link: "/ui.aiimg.com",
  },
  // {
  //   id: 4,
  //   title: "Animated Apple Iphone 3D Website",
  //   des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
  //   img: "/p4.svg",
  //   iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
  //   link: "/ui.apple.com",
  // },
];
export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer - Young Globes",
    description:
      "Assisted in the development of a web-based platform using Drupal and PHP, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    location: "coimbatore",
    duration: "Nov-2021 to June-2023",
  },

  {
    id: 2,
    title: "MERN stack Developer - Iprocest solution",
    description:
      "Developed and maintained user-facing features using modern web technologies using Next js and Node JS.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    location: "coimbatore",
    duration: "Nov-2021 to June-2023",
  },
];
export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "/gitgub",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "/twitter",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "/linkedin",
  },
];
