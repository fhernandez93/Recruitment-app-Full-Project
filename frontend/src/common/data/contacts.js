import avatar1 from "../../assets/images/users/avatar-1.jpg"
import avatar2 from "../../assets/images/users/avatar-2.jpg"
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
import avatar6 from "../../assets/images/users/avatar-6.jpg"
import avatar7 from "../../assets/images/users/avatar-7.jpg"
import avatar8 from "../../assets/images/users/avatar-8.jpg"




const users = [
  {
    id: 1,
    name: "David McHenry",
    designation: "UI/UX Designer",
    color: "primary",
    email: "david©optumus.com",
    projects: "125",
    globalStatus: "No Future Potential",
    tags: ["Administrative", "Call Center"],
  },
  {
    id: 2,
    // img: avatar2,
    name: "Frank Kirk",
    designation: "Frontend Developer",
    email: "frank©optumus.com",
    projects: "132",
    globalStatus: "Hired",
    tags: ["Call Center", "Claims Processing"],
  },
  {
    id: 3,
    // img: avatar3,
    name: "Rafael Morales",
    designation: "Backend Developer",
    email: "Rafael©optumus.com",
    projects: "1112",
    globalStatus: "Future Potential",
    tags: ["Claims Processing", "Customer Service"],
  },
  {
    id: 4,
    name: "Mark Ellison",
    designation: "Full Stack Developer",
    color: "success",
    email: "mark©optumus.com",
    projects: "121",
    globalStatus: "Future Potential",
    tags: ["Customer Service", "Financial"],
  },
  {
    id: 5,
    // img: avatar4,
    name: "Minnie Walter",
    designation: "Frontend Developer",
    email: "minnie©optumus.com",
    projects: "145",
    globalStatus: "Future Potential",
    tags: ["Administrative", "Call Center", "Claims Processing", "Customer Service", "Financial", "Insurance", "Medical Background", "Teaching"],
  },
  {
    id: 6,
    // img: avatar5,
    name: "Shirley Smith",
    designation: "UI/UX Designer",
    email: "shirley©optumus.com",
    projects: "136",
    globalStatus: "Future Potential",
    tags: ["Financial", "Insurance", "Medical Background"],
  },
  {
    id: 7,
    name: "John Santiago",
    designation: "Full Stack Developer",
    color: "info",
    email: "john©optumus.com",
    projects: "125",
    globalStatus: "Future Potential",
    tags: ["Insurance", "Medical Background", "Teaching"],
  },
  {
    id: 8,
    // img: avatar7,
    name: "Colin Melton",
    designation: "Backend Developer",
    color: "",
    email: "colin©optumus.com",
    projects: "136",
    globalStatus: "Future Potential",
    tags: ["Customer Service", "Financial"],
  },
  {
    id: 9,
    name: "David McHenry",
    designation: "UI/UX Designer",
    color: "primary",
    email: "david©optumus.com",
    projects: "125",
    globalStatus: "Future Potential",
    tags: ["Administrative", "Call Center", "Claims Processing", "Customer Service", "Financial", "Insurance", "Medical Background", "Teaching"],
  },
]
const userProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar1,
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthia@optumus.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      iconClass: "bx-server",
      link: "#",
      designation: "Back end Developer",
      timeDuration: "2016 - 19",
    },
    {
      id: 2,
      iconClass: "bx-code",
      link: "#",
      designation: "Front end Developer",
      timeDuration: "2013 - 16",
    },
    {
      id: 3,
      iconClass: "bx-edit",
      link: "#",
      designation: "UI /UX Designer",
      timeDuration: "2011 - 13",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Optumus Suite admin UI",
      startDate: "2 Sep, 2019",
      deadline: "20 Oct, 2019",
      budget: "$506",
    },
    {
      id: 2,
      name: "Optumus Suite admin Logo",
      startDate: "1 Sep, 2019",
      deadline: "2 Sep, 2019",
      budget: "$94",
    },
    {
      id: 3,
      name: "Redesign - Landing page",
      startDate: "21 Sep, 2019",
      deadline: "29 Sep, 2019",
      budget: "$156",
    },
    {
      id: 4,
      name: "App Landing UI",
      startDate: "29 Sep, 2019",
      deadline: "04 Oct, 2019",
      budget: "$122",
    },
    {
      id: 5,
      name: "Blog Template",
      startDate: "05 Oct, 2019",
      deadline: "16 Oct, 2019",
      budget: "$164",
    },
    {
      id: 6,
      name: "Redesign - Multipurpose Landing",
      startDate: "17 Oct, 2019",
      deadline: "05 Nov, 2019",
      budget: "$192",
    },
    {
      id: 7,
      name: "Logo Branding",
      startDate: "04 Nov, 2019",
      deadline: "05 Nov, 2019",
      budget: "$94",
    },
  ],
}
export { users, userProfile }