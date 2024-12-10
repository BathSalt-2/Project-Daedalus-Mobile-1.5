import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../../../services/auth/auth.service';
import { validateEmail, validatePassword, getPasswordStrength } from '../../../shared/utils/validation.utils';
import { handleError } from '../../../shared/utils/error.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  async onRegister(): Promise<void> {
    if (!this.validateForm()) return;

    try {
      this.loading = true;
      await this.authService.signUp(this.email, this.password);
      this.routerExtensions.navigate(['/home'], { clearHistory: true });
    } catch (error) {
      await handleError(error, 'Registration Error');
    } finally {
      this.loading = false;
    }
  }

  private validateForm(): boolean {
    if (!validateEmail(this.email)) {
      handleError({ message: 'Please enter a valid email address' });
      return false;
    }

    if (!validatePassword(this.password)) {
      handleError({ message: 'Password must be at least 8 characters long with uppercase, lowercase, and numbers' });
      return false;
    }

    if (this.password !== this.confirmPassword) {
      handleError({ message: 'Passwords do not match' });
      return false;
    }

    if (getPasswordStrength(this.password) === 'weak') {
      handleError({ message: 'Please choose a stronger password' });
      return false;
    }

    return true;
  }
}