import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Goal, UserProfile, GoalStatus } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Goal Queries
export function useGetAllGoals() {
  const { actor, isFetching } = useActor();

  return useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGoals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGoal(goalId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Goal>({
    queryKey: ['goal', goalId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getGoal(goalId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateGoal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string | null;
      targetDate: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createGoal(data.title, data.description, data.targetDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useUpdateGoal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      goalId: bigint;
      title: string;
      description: string | null;
      status: GoalStatus;
      targetDate: bigint | null;
      progress: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateGoal(
        data.goalId,
        data.title,
        data.description,
        data.status,
        data.targetDate,
        data.progress
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['goal', variables.goalId.toString()] });
    },
  });
}

export function useDeleteGoal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goalId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteGoal(goalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}
