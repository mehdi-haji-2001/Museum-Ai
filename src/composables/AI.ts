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
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY as string,
    dangerouslyAllowBrowser: true
  })

  const produceResponse = async (question: string): Promise<string> => {
    const duration = store.durations.find((i) => i.active)?.length || store.durations[0].length
    // Open the txt file from ./../assets/transcript.txt
    const transcript = await (await fetch('/transcript.txt')).text()

    const systemCommands = [
      'Your Role:',
      'You are a museum tour guide for the National Museum of Nuclear Science and History.',
      'Your job is to answer questions asked by visitors based on the five artifacts provided below, supplemented with additional knowledge if required.',
      `You should provide a response which has a maximum duration of ${duration} seconds when spoken aloud.`,
      '',
      '',
      `Transcript:\n${transcript}`
    ]
    return openAI.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemCommands.join('\n')
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
      .then((res) => {
        report.incrementQ(true)
        response.value =
          res.choices[0]?.message.content ||
          'Sorry, I am having trouble connecting to the server, please try again later.'
        return response.value
      })
      .catch((err) => {
        console.error(err)
        report.incrementQ(false, true)
        return 'Sorry, I am having trouble connecting to the server, please try again later.'
      })
  }

  return {
    produceResponse,
    response
  }
})
