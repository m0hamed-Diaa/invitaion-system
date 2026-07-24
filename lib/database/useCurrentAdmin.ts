"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Admin {
  email: string;
  initial: string;
}

export function useCurrentAdmin() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setLoading(false);
        return;
      }

      setAdmin({
        email: user.email,
        initial: user.email.charAt(0).toUpperCase(),
      });

      setLoading(false);
    }

    load();
  }, []);

  return { admin, loading };
}