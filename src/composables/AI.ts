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
    return openAI.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a museum tour guide. Use the transcript provided and answer users questions. Respond to the following question with response whose duration is around ${duration} seconds when spoken aloud.\n\nTranscript:\n**Introduction:**\nLadies and gentlemen, welcome to the Quantum Explorer Science Museum, where we embark on a journey through the wonders of scientific discovery. My name is [Your Name], and I am delighted to be your guide today. Our museum is home to a fascinating collection of artifacts that showcase the marvels of the natural world, cutting-edge technology, and groundbreaking scientific achievements. Without further ado, let's dive into the realm of knowledge and exploration.\n\n**Artifact 1: The Einstein-Rosen Bridge Generator:**\nOur first stop is the Einstein-Rosen Bridge Generator. This artifact represents a hypothetical portal that connects two separate points in spacetime, also known as a wormhole. While this device is not operational, it sparks the imagination and allows us to contemplate the possibilities of traversing the cosmos in ways previously only dreamed of by scientists and science fiction enthusiasts alike.\n\n**Artifact 2: The Lunar Rover Prototype:**\nMoving on, we find ourselves in the presence of a Lunar Rover Prototype. Used during the Apollo missions, this marvel of engineering played a crucial role in exploring the lunar surface. With its sturdy design and advanced technology, the rover allowed astronauts to conduct experiments and gather valuable data, expanding our understanding of the moon and space exploration.\n\n**Artifact 3: The DNA Double Helix Model:**\nAs we transition to the biological sciences, we encounter a beautifully crafted model of the DNA double helix. This fundamental structure, discovered by James Watson and Francis Crick, unlocked the secrets of genetic information. The model serves as a testament to the elegance and complexity of life at its most basic level, revealing the blueprint that shapes all living organisms.\n\n**Artifact 4: The Tesla Coil:**\nStepping into the realm of electricity and magnetism, we find the Tesla Coil. Invented by the visionary Nikola Tesla, this device produces high-voltage, high-frequency alternating-current electricity. Not only is it a captivating display of electrical phenomena, but it also pays homage to the pioneering work of Tesla, whose inventions laid the groundwork for modern electrical systems.\n\n**Artifact 5: The Large Hadron Collider (LHC) Component:**\nNow, let's explore the world of particle physics with a component from the Large Hadron Collider. This colossal machine, situated deep underground at CERN, allows scientists to accelerate particles to near the speed of light and collide them, unraveling the mysteries of the universe at the smallest scales. Our artifact provides a glimpse into the technological marvel that pushes the boundaries of our understanding of matter and energy.\n\n**Artifact 6: The CRISPR-Cas9 Gene Editing Kit:**\nOur penultimate stop introduces us to the CRISPR-Cas9 Gene Editing Kit. This revolutionary technology enables precise manipulation of genes, opening new frontiers in medicine, agriculture, and bioengineering. As we marvel at the potential of CRISPR, we also contemplate the ethical implications and responsibilities that come with such powerful tools.\n\n**Conclusion:**\nAs we conclude our tour, I hope you have enjoyed this exploration of the Quantum Explorer Science Museum. These artifacts represent just a fraction of the incredible advancements that have shaped our world. Science continues to push the boundaries of what we know, inviting us to question, learn, and marvel at the wonders that surround us. Thank you for joining us on this journey, and remember, the pursuit of knowledge is a never-ending adventure. Until next time, keep exploring, keep questioning, and keep discovering. Safe travels!`
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
