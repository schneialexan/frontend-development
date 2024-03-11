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
          list_id: number | null
        }
        Insert: {
          id?: number
          user_id: string
          task?: string | null
          is_completed?: boolean | null
          created_at?: string | null
          list_id?: number | null	
        }
        Update: {
          id?: number
          user_id?: string
          task?: string | null
          is_completed?: boolean | null
          created_at?: string | null
          list_id?: number | null
        }
      }
      lists: {
        Row: {
          id: number
          name: string
          user_id: string
        }
        Insert: {
          id?: number
          name: string
          user_id: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
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
