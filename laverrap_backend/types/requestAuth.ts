import type { User } from "@supabase/supabase-js";
import type { Request } from "express";

export interface RequestAuth extends Request {
    user?: User
}