import { Contract } from '@algorandfoundation/algorand-typescript'

export class Certificateofachievement extends Contract {
  hello(name: string): string {
    return `Hello, ${name}`
  }
}
