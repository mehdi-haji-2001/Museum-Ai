import type { LikeStatus } from '@/stores/settings'

export interface PastResponse {
  question: string
  answer: string
  likeStatus?: LikeStatus
}
