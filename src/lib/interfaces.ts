export interface IEmailListResponse {
  id: string
  from: {
    email: string
    name: string
  }
  date: number
  subject: string
  short_description: string
  longDescription?: string
}
