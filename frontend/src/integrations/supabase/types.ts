export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          address: string
          city: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          pincode: string
          state: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          pincode: string
          state: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          pincode?: string
          state?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      energy_production: {
        Row: {
          co2_offset_kg: number | null
          created_at: string
          date: string
          energy_consumed_kwh: number | null
          energy_exported_kwh: number | null
          energy_generated_kwh: number
          grid_savings: number | null
          id: string
          installation_id: string | null
        }
        Insert: {
          co2_offset_kg?: number | null
          created_at?: string
          date: string
          energy_consumed_kwh?: number | null
          energy_exported_kwh?: number | null
          energy_generated_kwh: number
          grid_savings?: number | null
          id?: string
          installation_id?: string | null
        }
        Update: {
          co2_offset_kg?: number | null
          created_at?: string
          date?: string
          energy_consumed_kwh?: number | null
          energy_exported_kwh?: number | null
          energy_generated_kwh?: number
          grid_savings?: number | null
          id?: string
          installation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "energy_production_installation_id_fkey"
            columns: ["installation_id"]
            isOneToOne: false
            referencedRelation: "installations"
            referencedColumns: ["id"]
          },
        ]
      }
      installations: {
        Row: {
          commissioning_date: string | null
          completion_date: string | null
          created_at: string
          equipment_details: Json | null
          id: string
          inspection_date: string | null
          installation_date: string | null
          installation_status: string | null
          installer_team_id: string | null
          quote_id: string | null
          updated_at: string
          warranty_start_date: string | null
          warranty_years: number | null
        }
        Insert: {
          commissioning_date?: string | null
          completion_date?: string | null
          created_at?: string
          equipment_details?: Json | null
          id?: string
          inspection_date?: string | null
          installation_date?: string | null
          installation_status?: string | null
          installer_team_id?: string | null
          quote_id?: string | null
          updated_at?: string
          warranty_start_date?: string | null
          warranty_years?: number | null
        }
        Update: {
          commissioning_date?: string | null
          completion_date?: string | null
          created_at?: string
          equipment_details?: Json | null
          id?: string
          inspection_date?: string | null
          installation_date?: string | null
          installation_status?: string | null
          installer_team_id?: string | null
          quote_id?: string | null
          updated_at?: string
          warranty_start_date?: string | null
          warranty_years?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "installations_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "solar_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          application_status: string | null
          approval_date: string | null
          bank_name: string | null
          created_at: string
          customer_id: string | null
          disbursement_date: string | null
          documents_submitted: boolean | null
          id: string
          interest_rate: number | null
          loan_amount: number
          loan_officer_contact: string | null
          monthly_emi: number | null
          quote_id: string | null
          tenure_months: number
          updated_at: string
        }
        Insert: {
          application_status?: string | null
          approval_date?: string | null
          bank_name?: string | null
          created_at?: string
          customer_id?: string | null
          disbursement_date?: string | null
          documents_submitted?: boolean | null
          id?: string
          interest_rate?: number | null
          loan_amount: number
          loan_officer_contact?: string | null
          monthly_emi?: number | null
          quote_id?: string | null
          tenure_months: number
          updated_at?: string
        }
        Update: {
          application_status?: string | null
          approval_date?: string | null
          bank_name?: string | null
          created_at?: string
          customer_id?: string | null
          disbursement_date?: string | null
          documents_submitted?: boolean | null
          id?: string
          interest_rate?: number | null
          loan_amount?: number
          loan_officer_contact?: string | null
          monthly_emi?: number | null
          quote_id?: string | null
          tenure_months?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loan_applications_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "solar_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_requests: {
        Row: {
          completion_date: string | null
          cost: number | null
          created_at: string
          customer_id: string | null
          description: string
          id: string
          installation_id: string | null
          priority: string | null
          request_type: string
          scheduled_date: string | null
          status: string | null
          technician_notes: string | null
          updated_at: string
        }
        Insert: {
          completion_date?: string | null
          cost?: number | null
          created_at?: string
          customer_id?: string | null
          description: string
          id?: string
          installation_id?: string | null
          priority?: string | null
          request_type: string
          scheduled_date?: string | null
          status?: string | null
          technician_notes?: string | null
          updated_at?: string
        }
        Update: {
          completion_date?: string | null
          cost?: number | null
          created_at?: string
          customer_id?: string | null
          description?: string
          id?: string
          installation_id?: string | null
          priority?: string | null
          request_type?: string
          scheduled_date?: string | null
          status?: string | null
          technician_notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_requests_installation_id_fkey"
            columns: ["installation_id"]
            isOneToOne: false
            referencedRelation: "installations"
            referencedColumns: ["id"]
          },
        ]
      }
      solar_quotes: {
        Row: {
          annual_savings: number | null
          created_at: string
          customer_id: string | null
          estimated_cost: number | null
          final_cost: number | null
          grid_connection_type: string | null
          id: string
          installation_type: string
          monthly_electricity_bill: number | null
          payback_period_years: number | null
          property_type: string | null
          quote_status: string | null
          roof_area_sqft: number | null
          roof_type: string | null
          shading_issues: boolean | null
          subsidy_amount: number | null
          system_size_kw: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          annual_savings?: number | null
          created_at?: string
          customer_id?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          grid_connection_type?: string | null
          id?: string
          installation_type: string
          monthly_electricity_bill?: number | null
          payback_period_years?: number | null
          property_type?: string | null
          quote_status?: string | null
          roof_area_sqft?: number | null
          roof_type?: string | null
          shading_issues?: boolean | null
          subsidy_amount?: number | null
          system_size_kw: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          annual_savings?: number | null
          created_at?: string
          customer_id?: string | null
          estimated_cost?: number | null
          final_cost?: number | null
          grid_connection_type?: string | null
          id?: string
          installation_type?: string
          monthly_electricity_bill?: number | null
          payback_period_years?: number | null
          property_type?: string | null
          quote_status?: string | null
          roof_area_sqft?: number | null
          roof_type?: string | null
          shading_issues?: boolean | null
          subsidy_amount?: number | null
          system_size_kw?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solar_quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
