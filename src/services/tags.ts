export const USERS = "USERS";
export const DETAILS = "DETAILS";
export const FAVORITES = "FAVORITES";
export const BLOGS = "BLOGS";
export const PROFILE = "PROFILE";
export const CHATS = "CHATS";

export const TAGS = [
  USERS,
  DETAILS,
  FAVORITES,
  BLOGS,
  PROFILE,
  CHATS
];

export const generateTags = (result: any, TAG: string) => {
  return result
    ? [
        ...result.map(({ _id }: any) => ({
          type: TAG,
          id: _id,
        })),
        { type: TAG, id: "LIST" },
      ]
    : [{ type: TAG, id: "LIST" }];
};

export const generateSingleTag = (result: any, TAG: string) => {
  return result
    ? [
        {
          type: TAG,
          id: result._id,
        },
      ]
    : [{ type: TAG, id: "LIST" }];
};
