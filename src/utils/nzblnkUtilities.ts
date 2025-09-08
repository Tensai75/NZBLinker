export interface NzblnkData {
  title: string
  header: string
  password: string
  date?: Date
  timestamp?: number
  isTimestamp: boolean
  groups: string[]
}

export function generateNzblnk(data: NzblnkData): URL {
  const { title, header, password, date, timestamp, isTimestamp, groups } = data

  // Determine the date string to use
  let linkDate: string | undefined = undefined
  if (isTimestamp && timestamp && timestamp > 0) linkDate = timestamp.toString()
  else if (date) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth() is 0-indexed
    const year = date.getFullYear()
    linkDate = `${day}.${month}.${year}`
  }

  // Construct the nzblnk URL
  const link = new URL('nzblnk://')
  if (header.length > 0) link.searchParams.append('h', header)
  if (title.length > 0) link.searchParams.append('t', title)
  if (password.length > 0) link.searchParams.append('p', password)
  if (groups.length > 0)
    groups.forEach((group) => {
      if (group.length > 0) link.searchParams.append('g', group)
    })
  if (linkDate) link.searchParams.append('d', linkDate)

  // Return the constructed nzblnk URL
  return link
}
