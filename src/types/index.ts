export interface Project {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  year: string
  featured?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Client {
  id: string
  name: string
  logo: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export interface AnimationConfig {
  initial: object
  animate: object
  exit?: object
  transition?: object
}
