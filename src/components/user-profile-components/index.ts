import { withClasses } from "../../hocs";
import { Introduct as ID } from "./introduct";
import { UserMedias as UM } from "./user-medias";
import { UserFriends as UF } from "./user-friends";
import classes from "./user-profile-controller.module.scss";

export const Introduct = withClasses(classes, ID);
export const UserMedias = withClasses(classes, UM);
export const UserFriends = withClasses(classes, UF);
