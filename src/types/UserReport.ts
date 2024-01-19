export interface UserReport {
  TQ: number // Total Number of Queries.
  TSQ: number // Total Successful Queries.
  TFNQ: number // Total Failed Network Queries.
  TFSQ: number // Total Failed Syntax Queries.
  TQE: number // Total Query Edits.
  TR: number // Total Repetitions.
  TFMS: number // Total Frequency of Modification of Settings.
  TAPR: number // Total Frequency of Asking for Previous Results
  AQWC: number // Average Query Word Count.
  ARS: number // Average Response Satisfaction.
  WC: number[] // Word Counts.
  SAT: number[] // Satisfaction Scores.
}
