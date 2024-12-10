import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../../../services/auth/auth.service';
import { validateEmail, validatePassword } from '../../../shared/utils/validation.utils';
import { handleError } from '../../../shared/utils/error.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  async onLogin(): Promise<void> {
    if (!this.validateForm()) return;

    try {
      this.loading = true;
      await this.authService.signIn(this.email, this.password);
      this.routerExtensions.navigate(['/home'], { clearHistory: true });
    } catch (error) {
      await handleError(error, 'Login Error');
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
      handleError({ message: 'Password must be at least 8 characters long' });
      return false;
    }

    return true;
  }
}