class NotifyService {
  info(message: string, title?: string, options?: any): void {
    abp.notify.info(message, title, options);
  }

  success(message: string, title?: string, options?: any): void {
    abp.notify.success(message, title, options);
  }

  warn(message: string, title?: string, options?: any): void {
    abp.notify.warn(message, title, options);
  }

  error(message: string, title?: string, options?: any): void {
    abp.notify.error(message, title, options);
  }
}

export default NotifyService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
