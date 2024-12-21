export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export interface TUser {
  name: UserName;
  email: string;
  password: string;
  role: string;
  isBlocked: boolean;
}

// export interface UserModel extends Model<TUser> {
//   isUserExistsByCustomId(id: string);
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
// }
