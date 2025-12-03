import { supabase } from "../db/supabase";

export const signUpWithProfile = async ({
  email,
  password,
  role,
  name,
  city,
  about,
  skills,
  orgName,
  audience,
}) => {
  // Step 1: Create user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;
  if (!user) throw new Error("No user returned from signUp");

  // Step 2: Insert profile record
  const profileData =
    role === "org"
      ? {
          id: user.id,
          role,
          org_name: orgName,
          city,
          audience,
          about,
          plan_type: "free",
        }
      : {
          id: user.id,
          role,
          name,
          city,
          skills,
          about,
          plan_type: "free",
        };

  const { error: profileError } = await supabase
    .from("perfil")
    .insert([profileData]);

  if (profileError) throw profileError;

  return { user };
};








