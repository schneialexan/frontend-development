export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: number
          user_id: string
          task: string | null
          is_completed: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          task?: string | null
          is_completed?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          task?: string | null
          is_completed?: boolean | null
          created_at?: string | null
        }
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
