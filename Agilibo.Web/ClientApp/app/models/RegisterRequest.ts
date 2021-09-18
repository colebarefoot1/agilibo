export class RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    username: string;

    constructor(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, username: string) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}

export class LoginModel {
    email: string;
    password: string;
  
}

export class PasswordResetModel {
    requestId: string;
    newPassword: string;

}