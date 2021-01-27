import { EmailValidator } from "../protocols/email-validator";

export class EmailValidation implements EmailValidator {
  isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
