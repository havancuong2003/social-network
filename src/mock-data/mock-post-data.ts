export const mockPostData = [
  {
    postId: "101",
    author: {
      userId: "1", // Thêm userId vào author
      name: "Ha Van Cuong",
      avatar: "/assets/medias/avatar.jpg",
    },
    date: "2024-11-19",
    content: "Cuoc Song ma !!!!",
    media: [
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/video/upload/v1732275726/uploads/mqvqbw1xpfzmptfdtgyg.mp4",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732275724/uploads/cd72qnamlgroqer43tmo.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732179719/uploads/tpf0zgztusdrxacbo7xd.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732179719/uploads/tpf0zgztusdrxacbo7xd.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732179719/uploads/tpf0zgztusdrxacbo7xd.jpg",
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732177503/uploads/ykw3slx81sdw7e8fqnzt.jpg",
      "https://res.cloudinary.com/ddvt5srdy/video/upload/v1732179718/uploads/iysoywv7xyypvmwon0ni.mp4",
    ], // Đảm bảo đường dẫn đúng
    likes: 120,
    likedBy: ["2", "3", "4"],
    comments: [
      {
        _id: "201",
        userId: "2",
        userName: "Tran Thi B",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Looks amazing!",
        date: "2024-11-02",
      },
      {
        _id: "202",
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
      userId: "1", // Thêm userId vào author
      name: "Đỗ Thùy Linh",
      avatar: "/assets/medias/avatarLinh.jpg",
    },
    date: "2024-10-29",
    content: "Linh Ngao ne",
    media: [
      "/assets/medias/funny.mp4",
      "/assets/medias/imgLinh.jpg",
      "/assets/medias/imgLinh2.jpg",
      "/assets/medias/quay.mp4",
    ],
    likes: 95,
    likedBy: ["3"],
    comments: [
      {
        _id: "203",
        userId: "3",
        userName: "Le Van C",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Good luck with the new project!",
        date: "2024-10-30",
      },
    ],
  },
  {
    postId: "103",
    author: {
      userId: "1", // Thêm userId vào author
      name: "Nguyen Van A",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    date: "2024-09-15",
    content: "Just finished a great book on JavaScript programming! 📚💻",
    media: ["https://images.pexels.com/photos/17780/pexels-photo.jpg"],
    likes: 80,
    likedBy: ["2", "3"],
    comments: [
      {
        _id: "204",
        userId: "2",
        userName: "Tran Thi B",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Nice! I’ve been wanting to read that one.",
        date: "2024-09-16",
      },
      {
        _id: "205",
        userId: "3",
        userName: "Le Van C",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Definitely adding it to my list.",
        date: "2024-09-16",
      },
    ],
  },
  {
    postId: "104",
    author: {
      userId: "1", // Thêm userId vào author
      name: "Nguyen Van A",
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    date: "2024-11-10",
    content: "Celebrating my 10th anniversary at Innovate IT today! 🎉",
    media: [
      "https://res.cloudinary.com/ddvt5srdy/image/upload/v1732179719/uploads/tpf0zgztusdrxacbo7xd.jpg",
    ],
    likes: 150,
    likedBy: ["3", "2"],
    comments: [
      {
        _id: "206",
        userId: "3",
        userName: "Le Van C",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Congrats on the milestone!",
        date: "2024-11-11",
      },
      {
        _id: "207",
        userId: "2",
        userName: "Tran Thi B",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "That’s awesome! Here’s to many more!",
        date: "2024-11-11",
      },
    ],
  },
];
