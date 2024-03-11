declare interface Task {
  id: number
  user_id?: UUID
  task: string
  is_completed: boolean
  created_at?: string
  list_id?: number
}
