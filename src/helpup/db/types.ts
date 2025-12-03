export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      avaliacoes: {
        Row: {
          comentario: string | null;
          data_avaliacao: string | null;
          id: string;
          id_organizacao: string;
          id_voluntario: string;
          nota: number | null;
        };
        Insert: {
          comentario?: string | null;
          data_avaliacao?: string | null;
          id?: string;
          id_organizacao: string;
          id_voluntario: string;
          nota?: number | null;
        };
        Update: {
          comentario?: string | null;
          data_avaliacao?: string | null;
          id?: string;
          id_organizacao?: string;
          id_voluntario?: string;
          nota?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_organizacao";
            columns: ["id_organizacao"];
            isOneToOne: false;
            referencedRelation: "perfil";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_voluntario";
            columns: ["id_voluntario"];
            isOneToOne: false;
            referencedRelation: "perfil";
            referencedColumns: ["id"];
          }
        ];
      };
      candidaturas: {
        Row: {
          created_at: string;
          id: number;
          usuario_id: string;
          vaga_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          usuario_id?: string;
          vaga_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          usuario_id?: string;
          vaga_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "candidaturas_usuario_id_fkey";
            columns: ["usuario_id"];
            isOneToOne: false;
            referencedRelation: "perfil";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "candidaturas_vaga_id_fkey";
            columns: ["vaga_id"];
            isOneToOne: false;
            referencedRelation: "vagas";
            referencedColumns: ["id"];
          }
        ];
      };
      perfil: {
        Row: {
          about: string | null;
          audience: string | null;
          city: string | null;
          created_at: string | null;
          id: string;
          name: string | null;
          org_name: string | null;
          plan_type: Database["public"]["Enums"]["Plan Type"];
          role: string;
          skills: string | null;
        };
        Insert: {
          about?: string | null;
          audience?: string | null;
          city?: string | null;
          created_at?: string | null;
          id: string;
          name?: string | null;
          org_name?: string | null;
          plan_type?: Database["public"]["Enums"]["Plan Type"];
          role: string;
          skills?: string | null;
        };
        Update: {
          about?: string | null;
          audience?: string | null;
          city?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string | null;
          org_name?: string | null;
          plan_type?: Database["public"]["Enums"]["Plan Type"];
          role?: string;
          skills?: string | null;
        };
        Relationships: [];
      };
      vagas: {
        Row: {
          atividades: string | null;
          capa: string | null;
          categoria: string | null;
          created_at: string;
          descricao: string | null;
          habilidades: string | null;
          id: number;
          local_tempo: string | null;
          ong: string;
          publico: string | null;
          titulo: string;
        };
        Insert: {
          atividades?: string | null;
          capa?: string | null;
          categoria?: string | null;
          created_at?: string;
          descricao?: string | null;
          habilidades?: string | null;
          id?: number;
          local_tempo?: string | null;
          ong: string;
          publico?: string | null;
          titulo: string;
        };
        Update: {
          atividades?: string | null;
          capa?: string | null;
          categoria?: string | null;
          created_at?: string;
          descricao?: string | null;
          habilidades?: string | null;
          id?: number;
          local_tempo?: string | null;
          ong?: string;
          publico?: string | null;
          titulo?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vagas_ong_fkey";
            columns: ["ong"];
            isOneToOne: false;
            referencedRelation: "perfil";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "Plan Type": "free" | "premium";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      "Plan Type": ["free", "premium"],
    },
  },
} as const;

export type PlanType = Database["public"]["Enums"]["Plan Type"];
