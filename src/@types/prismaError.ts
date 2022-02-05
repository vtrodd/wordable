export type PrismaError = {
  code: string
  clientVersion: string
  meta: {
    cause: string
  }
}