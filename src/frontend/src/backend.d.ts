import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Goal {
    id: GoalId;
    status: GoalStatus;
    title: string;
    createdAt: Time;
    description?: string;
    updatedAt: Time;
    progress: bigint;
    targetDate?: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export type GoalId = bigint;
export enum GoalStatus {
    notStarted = "notStarted",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGoal(title: string, description: string | null, targetDate: Time | null): Promise<GoalId>;
    deleteGoal(goalId: GoalId): Promise<void>;
    getAllGoals(): Promise<Array<Goal>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGoal(goalId: GoalId): Promise<Goal>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setGoalCompleted(goalId: GoalId): Promise<void>;
    setGoalNotCompleted(goalId: GoalId): Promise<void>;
    updateGoal(goalId: GoalId, title: string, description: string | null, status: GoalStatus, targetDate: Time | null, progress: bigint): Promise<void>;
}
