import { ref } from 'vue'
import OpenAI from 'openai'
import { useSettingsStore } from '@/stores/settings'
import { defineStore } from 'pinia'
import { useReportStore } from '@/stores/report'

export const useAI = defineStore('AI', () => {
  const store = useSettingsStore()
  const report = useReportStore()
  const response = ref('')

  const openAI = new OpenAI({
    apiKey: import.meta.env.VITE_GPT as string,
    dangerouslyAllowBrowser: true
  })

  const produceAPIMessage = (question: string) => {
    const duration = store.durations.find((i) => i.active)?.length || store.durations[0].length
    return `Respond to the following question with response whose duration is around ${duration} seconds when spoken aloud: ${question}`
  }

  const produceResponse = async (question: string): Promise<string> => {
    // response.value = 'Thinking...'
    // return openAI.chat.completions
    //   .create({
    //     model: 'gpt-3.5-turbo',
    //     messages: [{ role: 'user', content: produceAPIMessage(question) }],
    //     stream: true
    //   })
    //   .then(async (res) => {
    //     for await (const responsePiece of res) {
    //       const rp = responsePiece.choices[0]?.delta?.content || ''
    //       response.value += rp
    //     }
    //     report.incrementQ(true)
    //     return response.value
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //     report.incrementQ(false, true)
    //     return 'Sorry, I am having trouble connecting to the server, please try again later.'
    //   })

    // For testing purposes
    report.incrementQ(true)
    response.value = 'This is a generic response.\n Your question was: ' + question
    return response.value
  }

  return {
    produceResponse,
    response
  }
})
