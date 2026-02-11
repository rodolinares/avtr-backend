export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Metadata {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}
