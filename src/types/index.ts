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


export interface AuthStore {
  userProfile: IUser | null;
  allUsers: IUser[];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<void>;
}
