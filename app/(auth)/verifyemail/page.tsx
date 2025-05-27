"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const [token, setToken] = useState("");
  const [verified, setVerifed] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("api/admin/verifyemail", { token });

      setVerifed(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    verifyUserEmail();
  }, [token]);

  return <main>VerifyEmailPage</main>;
};

export default VerifyEmailPage;
