import { contact } from "@/lib/services/contact";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";

export const useContact = () => {
  const router = useRouter();

  const {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
    submittedAt,
    variables,
  } = useMutation({
    mutationFn: contact.postContactForm,
    onSuccess: () => {
      router.push("/contact?status=success");
    },
  });

  return {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
    submittedAt,
    variables,
  };
};
