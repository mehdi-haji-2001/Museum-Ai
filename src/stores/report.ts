import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserReport } from '../types/UserReport'

export const useReportStore = defineStore('report', () => {
  const sessionReport = ref<UserReport>({
    TQ: 0,
    TSQ: 0,
    TFNQ: 0,
    TFSQ: 0,
    TQE: 0,
    TR: 0,
    TFMS: 0,
    TAPR: 0,
    AQWC: 0,
    ARS: 0,
    WC: [],
    SAT: []
  })

  const incrementQ = (success: boolean, network: boolean = false) => {
    success ? incrementTSQ() : incrementTFQ(network)
  }

  const incrementTSQ = () => {
    sessionReport.value.TSQ++
  }

  const incrementTFQ = (network: boolean) => {
    network ? incrementTFNQ() : incrementTFSQ()
  }

  const incrementTFNQ = () => {
    sessionReport.value.TFNQ++
  }

  const incrementTFSQ = () => {
    sessionReport.value.TFSQ++
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
    sessionReport.value.TQ =
      sessionReport.value.TSQ + sessionReport.value.TFNQ + sessionReport.value.TFSQ
    return sessionReport.value
  }

  return {
    incrementQ,
    incrementTQE,
    incrementTR,
    incrementTFMS,
    incrementTAPR,
    updateAQWC,
    updateARS,
    produceReport
  }
})
