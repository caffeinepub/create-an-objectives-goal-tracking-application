import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type GoalId = Nat;

  type GoalStatus = {
    #notStarted;
    #inProgress;
    #completed;
  };

  type Goal = {
    id : GoalId;
    title : Text;
    description : ?Text;
    status : GoalStatus;
    targetDate : ?Time.Time;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    progress : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  let userGoals = Map.empty<Principal, Map.Map<GoalId, Goal>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextGoalId = 1;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createGoal(title : Text, description : ?Text, targetDate : ?Time.Time) : async GoalId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create goals");
    };

    let currentTime = Time.now();
    let newGoal : Goal = {
      id = nextGoalId;
      title;
      description;
      status = #notStarted;
      targetDate;
      createdAt = currentTime;
      updatedAt = currentTime;
      progress = 0;
    };

    let existingGoals = switch (userGoals.get(caller)) {
      case (?goals) { goals };
      case (null) { Map.empty<GoalId, Goal>() };
    };

    existingGoals.add(nextGoalId, newGoal);
    userGoals.add(caller, existingGoals);

    nextGoalId += 1;
    newGoal.id;
  };

  public shared ({ caller }) func updateGoal(goalId : GoalId, title : Text, description : ?Text, status : GoalStatus, targetDate : ?Time.Time, progress : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update goals");
    };

    switch (userGoals.get(caller)) {
      case (null) { Runtime.trap("Goal not found for user") };
      case (?goals) {
        switch (goals.get(goalId)) {
          case (null) { Runtime.trap("Goal not found") };
          case (?existingGoal) {
            let updatedGoal : Goal = {
              id = existingGoal.id;
              title;
              description;
              status;
              targetDate;
              createdAt = existingGoal.createdAt;
              updatedAt = Time.now();
              progress;
            };
            goals.add(goalId, updatedGoal);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deleteGoal(goalId : GoalId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete goals");
    };

    switch (userGoals.get(caller)) {
      case (null) { Runtime.trap("Goals not found for user") };
      case (?goals) {
        if (not goals.containsKey(goalId)) {
          Runtime.trap("Goal not found");
        };
        goals.remove(goalId);
      };
    };
  };

  public query ({ caller }) func getGoal(goalId : GoalId) : async Goal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access goals");
    };

    switch (userGoals.get(caller)) {
      case (null) { Runtime.trap("Goal not found for user") };
      case (?goals) {
        switch (goals.get(goalId)) {
          case (null) { Runtime.trap("Goal not found") };
          case (?goal) { goal };
        };
      };
    };
  };

  public query ({ caller }) func getAllGoals() : async [Goal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access goals");
    };

    switch (userGoals.get(caller)) {
      case (null) { [] };
      case (?goals) {
        let goalsList = List.empty<Goal>();
        for ((_, goal) in goals.entries()) {
          goalsList.add(goal);
        };
        goalsList.toArray();
      };
    };
  };
};
