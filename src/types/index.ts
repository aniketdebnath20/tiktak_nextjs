export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

// export interface User {
//   _id: string;
//   name: string;
//   image: string;
//   // Add other user properties from your Sanity schema if needed
// }

export interface AuthStore {
  userProfile: IUser | null;
  allUsers: IUser[];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<void>;
}
