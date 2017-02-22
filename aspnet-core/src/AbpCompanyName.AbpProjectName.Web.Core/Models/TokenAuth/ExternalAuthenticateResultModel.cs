namespace AbpCompanyName.AbpProjectName.Models.TokenAuth
{
    public class ExternalAuthenticateResultModel
    {
        public string AccessToken { get; set; }

        public int ExpireInSeconds { get; set; }

        public bool WaitingForActivation { get; set; }
    }
}
