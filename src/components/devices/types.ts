export interface DeviceScreenshot {
  src: string
  alt: string
  width: number
  height: number
  includesStatusBar?: boolean
}

export interface DeviceProps {
  eager?: boolean
  screenshot?: DeviceScreenshot
}
