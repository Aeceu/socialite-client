import { create } from "zustand";
import { TUser } from "../types/user";
import { devtools } from "zustand/middleware";
import { TPost, TSharePost } from "../types/post";

type State = {
  token: string | null;
  user: TUser | null;
  friends: TUser[];
  post: TPost | null;
  allPosts: TPost[];
  allSharedPost: TSharePost[];
  userPosts: TPost[];
  userSharedPosts: TSharePost[];
  feed: (TPost | TSharePost)[];
};

type Action = {
  setToken: (token: string | null) => void;
  setUser: (user: TUser | null) => void;
  setPost: (post: TPost | null) => void;
  setAllPosts: (post: TPost[]) => void;
  updateOnePost: (newPost: TPost) => void;
  setUserFriends: (users: TUser[]) => void;
  setAllSharedPost: (sharedpost: TSharePost[]) => void;
  updateOneSharePost: (newSharedPost: TSharePost) => void;
  setUserPosts: (posts: TPost[]) => void;
  setUserSharedPosts: (posts: TSharePost[]) => void;
  setFeed: (feed: (TPost | TSharePost)[]) => void;
};

const UserStore = create<State & Action>()(
  devtools(
    (set) => ({
      token: null,
      setToken: (token) => {
        set({ token });
      },

      user: null,
      setUser: (user) => {
        set({ user });
      },

      post: null,
      setPost: (post) => {
        set({ post });
      },

      allPosts: [],
      setAllPosts: (allPosts) => {
        set({ allPosts });
      },
      updateOnePost: (newPost) => {
        set((state) => {
          const indexOfToUpdate = state.allPosts.findIndex((item) => item.id === newPost.id);
          const newAllPosts = [...state.allPosts];

          if (indexOfToUpdate !== -1) {
            newAllPosts[indexOfToUpdate] = newPost;
          }
          return {
            ...state,
            allPosts: newAllPosts,
          };
        });
      },

      friends: [],
      setUserFriends: (users) => {
        set({ friends: users });
      },

      allSharedPost: [],
      setAllSharedPost: (sharedpost) => {
        set({ allSharedPost: sharedpost });
      },
      updateOneSharePost: (newSharedPost) => {
        set((state) => {
          const indexOfToUpdate = state.allSharedPost.findIndex(
            (item) => item.id === newSharedPost.id
          );
          const newAllSharedPosts = [...state.allSharedPost];

          if (indexOfToUpdate !== -1) {
            newAllSharedPosts[indexOfToUpdate] = newSharedPost;
          }
          return {
            ...state,
            allSharedPost: newAllSharedPosts,
          };
        });
      },

      userPosts: [],
      setUserPosts: (userPosts) => {
        set({ userPosts });
      },
      userSharedPosts: [],
      setUserSharedPosts: (userSharedPosts) => {
        set({ userSharedPosts });
      },
      feed: [],
      setFeed: (post) => {
        set({ feed: post });
      },
    }),
    { name: "UserStore" }
  )
);

export default UserStore;
