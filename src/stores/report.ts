import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserReport } from '../types/UserReport'

export const useReportStore = defineStore('report', () => {
  const sessionReport = ref<UserReport>({} as UserReport)

  const incrementTQ = (success: boolean) => {
    sessionReport.value.TQ++
    success ? incrementTSQ() : incrementTFQ()
  }

  const incrementTSQ = () => {
    sessionReport.value.TSQ++
  }

  const incrementTFQ = () => {
    sessionReport.value.TFQ++
  }

  const incrementTQE = () => {
    sessionReport.value.TQE++
  }

  const incrementTR = () => {
    sessionReport.value.TR++
  }

  const incrementTFMS = () => {
    sessionReport.value.TFMS++
  }

  const incrementTAPR = () => {
    sessionReport.value.TAPR++
  }

  const incrementTVQ = () => {
    sessionReport.value.TVQ++
  }

  const incrementTIQ = () => {
    sessionReport.value.TIQ++
  }

  const updateAQWC = (queryWC: number) => {
    sessionReport.value.WC.push(queryWC)
    sessionReport.value.AQWC =
      sessionReport.value.WC.reduce(
        (total: number, currentValue: number) => total + currentValue,
        0
      ) / sessionReport.value.WC.length
  }

  const updateARS = (sat: number) => {
    sessionReport.value.SAT.push(sat)
    sessionReport.value.ARS =
      sessionReport.value.SAT.reduce(
        (total: number, currentValue: number) => total + currentValue,
        0
      ) / sessionReport.value.SAT.length
  }

  const produceReport = () => {
    return sessionReport.value
  }

  return {
    incrementTQ,
    incrementTQE,
    incrementTR,
    incrementTFMS,
    incrementTAPR,
    incrementTVQ,
    incrementTIQ,
    updateAQWC,
    updateARS,
    produceReport
  }
})
