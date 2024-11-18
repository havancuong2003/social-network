import { withClasses } from "../../hocs/with-classes";
import { UserProfile as UP } from "./user-profile";
import classes from "./user-profile.module.scss";

export const UserProfile = withClasses(classes, UP);
