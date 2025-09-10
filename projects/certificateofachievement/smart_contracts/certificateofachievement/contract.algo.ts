import { Contract, GlobalState } from '@algorandfoundation/algorand-typescript'

export class certificateofachievement extends Contract {
  student = GlobalState<string>({ key: "student", initialValue: "none" })
  award = GlobalState<string>({ key: "award", initialValue: "none" })

  issueCert(name: string, award: string): string {
    this.student.value = name
    this.award.value = award
    return "Certificate: " + name + " got " + award
  }
}
