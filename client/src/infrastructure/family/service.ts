import { Family } from "../../model/Family";
import { FamilyApi } from "./interfaces";

/**
 * Service for interacting with family-related data.
 */
export class FamilyService implements FamilyApi {
    private readonly api: FamilyApi;

    constructor(api: FamilyApi) {
        this.api = api;
    }

    createFamily(name: string, signal?: AbortSignal): Promise<Family> {
        return this.api.createFamily(name, signal);
    }

    deleteFamily(signal?: AbortSignal): Promise<void> {
        return this.api.deleteFamily(signal);
    }

    editFamily(name: string, signal?: AbortSignal): Promise<Family> {
        return this.api.editFamily(name, signal);
    }

    getFamily(signal?: AbortSignal): Promise<Family> {
        return this.api.getFamily(signal);
    }

    addMember(email: string, signal?: AbortSignal): Promise<Family> {
        return this.api.addMember(email, signal);
    }

    removeMember(userId: number, signal?: AbortSignal): Promise<Family> {
        return this.api.removeMember(userId, signal);
    }

    demoteMember(userId: number, signal?: AbortSignal): Promise<Family> {
        return this.api.demoteMember(userId, signal);
    }

    promoteMember(userId: number, signal?: AbortSignal): Promise<Family> {
        return this.api.promoteMember(userId, signal);
    }

    moveOwnership(userId: number, signal?: AbortSignal): Promise<Family> {
        return this.api.moveOwnership(userId, signal);
    }
}
