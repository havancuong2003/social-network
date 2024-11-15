export const mockUserData = {
  userId: "1",
  personalInfo: {
    firstName: "Nguyen",
    lastName: "Van A",
    gender: "Male",
    birthdate: "1990-01-15",
    location: "Ho Chi Minh City, Vietnam",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
  },
  profileImages: {
    avatar: "https://avatar.iran.liara.run/public/boy",
    coverPhoto:
      "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-513809-1323206.jpg&fm=jpg",
  },
  education: [
    {
      schoolName: "Ho Chi Minh University of Technology",
      degree: "Bachelor's in Computer Science",
      yearGraduated: "2012",
    },
  ],
  workExperience: [
    {
      companyName: "Tech Solutions Ltd.",
      position: "Frontend Developer",
      years: "2015 - 2020",
    },
    {
      companyName: "Innovate IT",
      position: "Senior Software Engineer",
      years: "2020 - Present",
    },
  ],
  socialLinks: {
    facebook: "https://facebook.com/nguyenvana",
    instagram: "https://instagram.com/nguyenvana",
    twitter: "https://twitter.com/nguyenvana",
  },
  friends: [
    {
      friendId: "2",
      name: "Tran Thi B",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    {
      friendId: "3",
      name: "Le Van C",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
  ],
  posts: [
    {
      postId: "101",
      author: {
        name: "Nguyen Van A",
        avatar: "https://avatar.iran.liara.run/public/boy",
      },
      date: "2024-11-01",
      content: "Had a great time at the tech conference!",
      images: [
        "https://file.hstatic.net/200000695275/article/goku-dragon-ball_thumbnail_hobi_82cdb25dc32a4b4ca1ba9cd98097f375_1024x1024.jpg",
        "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      ],
      likes: 120,
      comments: [
        {
          commentId: "201",
          userId: "2",
          userName: "Tran Thi B",
          userAvatar: "https://avatar.iran.liara.run/public/boy",
          text: "Looks amazing!",
          date: "2024-11-02",
        },
        {
          commentId: "202",
          userId: "3",
          userName: "Le Van C",
          userAvatar: "https://avatar.iran.liara.run/public/boy",
          text: "Wish I could have been there!",
          date: "2024-11-02",
        },
      ],
    },
    {
      postId: "102",
      author: {
        name: "Nguyen Van A",
        avatar: "https://avatar.iran.liara.run/public/boy",
      },
      date: "2024-10-29",
      content: "Excited to start a new project with the team!",
      images: [
        "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg",
      ],
      likes: 95,
      comments: [
        {
          commentId: "203",
          userId: "3",
          userName: "Le Van C",
          userAvatar: "https://avatar.iran.liara.run/public/boy",
          text: "Good luck with the new project!",
          date: "2024-10-30",
        },
      ],
    },
  ],
  bio: "Software engineer with a passion for coding and technology. Love traveling, coffee, and learning new things every day.",
};
