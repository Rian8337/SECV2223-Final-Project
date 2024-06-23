import FamilyApi from "./api";
import { FamilyService } from "./service";

const service = new FamilyService(FamilyApi);

/**
 * Service for interacting with family-related data.
 */
export default service;
