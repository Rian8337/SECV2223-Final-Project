import UserApi from "./api";
import { UserService } from "./service";

const service = new UserService(UserApi);

/**
 * Service for interacting with user-related data.
 */
export default service;
