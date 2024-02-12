import { postRequest } from ".";

export const contact = {
  postContactForm: async (data: ContactFormData) => {
    const url = process.env.NEXT_PUBLIC_FORMSPREE_URL as string;

    const res = postRequest(url, data);
    return res;
  },
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
