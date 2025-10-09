export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string
          description: string | null
          id: number
          model_brand: string | null
          name: string
          patent: string
          phone: string | null
          status: Database["public"]["Enums"]["client_status"]
          user_id: string
          vehicle_type: Database["public"]["Enums"]["vehicles_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          model_brand?: string | null
          name: string
          patent: string
          phone?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          user_id: string
          vehicle_type: Database["public"]["Enums"]["vehicles_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          model_brand?: string | null
          name?: string
          patent?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          user_id?: string
          vehicle_type?: Database["public"]["Enums"]["vehicles_type"]
        }
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: Database["public"]["Enums"]["services_category"]
          created_at: string
          description: string | null
          duration: number | null
          id: number
          name: string
          price: number
          status: Database["public"]["Enums"]["services_status"]
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["services_category"]
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: number
          name: string
          price: number
          status: Database["public"]["Enums"]["services_status"]
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["services_category"]
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: number
          name?: string
          price?: number
          status?: Database["public"]["Enums"]["services_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          username?: string | null
        }
        Relationships: []
      }
      washed: {
        Row: {
          client_id: number
          created_at: string
          id: number
          notified_client: boolean
          service_id: number
          status: Database["public"]["Enums"]["washed_status"]
          user_id: string
        }
        Insert: {
          client_id: number
          created_at?: string
          id?: number
          notified_client?: boolean
          service_id: number
          status?: Database["public"]["Enums"]["washed_status"]
          user_id: string
        }
        Update: {
          client_id?: number
          created_at?: string
          id?: number
          notified_client?: boolean
          service_id?: number
          status?: Database["public"]["Enums"]["washed_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "washed_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "washed_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "washed_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      client_status: "active" | "inactive"
      services_category: "basic" | "complete" | "premium" | "other"
      services_status: "active" | "inactive"
      vehicles_type: "car" | "pickup" | "motorcycle" | "other"
      washed_status: "in_progress" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      client_status: ["active", "inactive"],
      services_category: ["basic", "complete", "premium", "other"],
      services_status: ["active", "inactive"],
      vehicles_type: ["car", "pickup", "motorcycle", "other"],
      washed_status: ["in_progress", "completed", "cancelled"],
    },
  },
} as const
