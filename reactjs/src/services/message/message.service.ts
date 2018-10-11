class MessageService {
  info(message: string, title?: string): any {
    return abp.message.info(message, title);
  }

  success(message: string, title?: string): any {
    return abp.message.success(message, title);
  }

  warn(message: string, title?: string): any {
    return abp.message.warn(message, title);
  }

  error(message: string, title?: string): any {
    return abp.message.error(message, title);
  }

  confirm(message: string, callback?: (result: boolean) => void): any;
  confirm(
    message: string,
    title?: string,
    callback?: (result: boolean) => void
  ): any;

  confirm(
    message: string,
    titleOrCallBack?: string | ((result: boolean) => void),
    callback?: (result: boolean) => void
  ): any {
    if (typeof titleOrCallBack == "string") {
      return abp.message.confirm(message, titleOrCallBack as string, callback);
    } else {
      return abp.message.confirm(message, undefined, titleOrCallBack as ((
        result: boolean
      ) => void));
    }
  }
}

export default new MessageService();
