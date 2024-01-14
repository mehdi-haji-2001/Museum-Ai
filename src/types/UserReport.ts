export interface UserReport {
  TQ: number // Total Number of Queries
  TSQ: number // Total Successful Queries
  TFQ: number // Total Failed Queries
  TQE: number // Total Query Edits
  TR: number // Total Repetitions
  TFMS: number // Total Frequency of Modification of Settings
  TAPR: number // Total Frequency of Asking for Previous Results
  AQWC: number // Average Query Word Count
  ARS: number // Average Response Satisfaction
  TVQ: number // Total Valid Queries
  TIQ: number // Total Invalid Queries
  WC: number[] // Word Counts.
  SAT: number[] // Satisfaction Scores.
}
