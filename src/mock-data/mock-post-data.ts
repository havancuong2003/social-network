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
      "/assets/medias/life/1.jpg",
      "/assets/medias/life/2.jpg",
      "/assets/medias/life/3.jpg",
      "/assets/medias/life/4.jpg",
      "/assets/medias/life/5.jpg",
      "/assets/medias/life/6.jpg",
      "/assets/medias/life/7.jpg",
      "/assets/medias/life/8.jpg",
      "/assets/medias/life/9.jpg",
      "/assets/medias/life/10.jpg",
      "/assets/medias/life/cuocsong.mp4",
      "/assets/medias/life/uocdi.mp4",
    ], // Đảm bảo đường dẫn đúng
    likes: 120,
    likedBy: ["2", "3", "4"],
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
        commentId: "203",
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
        commentId: "204",
        userId: "2",
        userName: "Tran Thi B",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Nice! I’ve been wanting to read that one.",
        date: "2024-09-16",
      },
      {
        commentId: "205",
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
    media: ["https://images.pexels.com/photos/305189/pexels-photo-305189.jpeg"],
    likes: 150,
    likedBy: ["3", "2"],
    comments: [
      {
        commentId: "206",
        userId: "3",
        userName: "Le Van C",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "Congrats on the milestone!",
        date: "2024-11-11",
      },
      {
        commentId: "207",
        userId: "2",
        userName: "Tran Thi B",
        userAvatar: "https://avatar.iran.liara.run/public/boy",
        text: "That’s awesome! Here’s to many more!",
        date: "2024-11-11",
      },
    ],
  },
];
