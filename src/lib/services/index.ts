export const getRequest = async (url: string, options?: RequestInit) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(`[GET] ${url}`);
    const response = await fetch(url, { ...config, ...options });
    const { data, meta, error } = await response.json();
    if (error) {
      throw new Error(error);
    }

    return {
      data,
      meta,
    };
  } catch (error) {
    throw new Error("Error Fetching Data");
  }
};

export const postRequest = async (url: string, body: any) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, config);
    const { data, error } = await response.json();
    if (error) {
      throw new Error(error);
    }

    return data;
  } catch (error) {
    throw new Error("Error Posting Data");
  }
};
