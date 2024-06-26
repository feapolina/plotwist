import { supabase } from '@/services/supabase'

export const getUserLastReviewService = async (userId: string) => {
  const { data } = await supabase
    .from('reviews_ordered_by_likes')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return data
}
