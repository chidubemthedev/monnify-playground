import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import {
  InviteTeamMembersRequest,
  InviteTeamMembersResponse,
  TeamMember,
} from "@/types/teamType";

// 1. Invite Team Members Mutation
const inviteTeamMembers = async (
  data: InviteTeamMembersRequest
): Promise<InviteTeamMembersResponse> => {
  const response = await axiosInstance.post<InviteTeamMembersResponse>(
    "/admin/team-members/bulk-invite",
    data
  );
  return response.data;
};

export const useInviteTeamMembersMutation = (): UseMutationResult<
  InviteTeamMembersResponse,
  Error,
  InviteTeamMembersRequest
> => {
  return useMutation<
    InviteTeamMembersResponse,
    Error,
    InviteTeamMembersRequest
  >({
    mutationFn: inviteTeamMembers,
    onSuccess: () => {
      toast.success("Invitations sent!", {
        description: "Team members have been invited successfully.",
        duration: 5000,
      });
    },
    onError: () => {
      toast.error("Failed to send invitations", {
        description: "Please try again.",
        duration: 5000,
      });
    },
  });
};

// 2. Get All Team Members Query
const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await axiosInstance.get<{ data: TeamMember[] }>(
    "/admin/team-members"
  );
  return response.data.data;
};

export const useGetTeamMembersQuery = (): UseQueryResult<
  TeamMember[],
  Error
> => {
  return useQuery<TeamMember[], Error>({
    queryKey: ["team-members"],
    queryFn: getTeamMembers,
  });
};
