namespace OdataPlayground.Configs;

public class Client
{
    private readonly HttpClient _httpClient;

    public Client(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetAsync(string url)
    {
        var requestMessage = new HttpRequestMessage()
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(url),
        };
                
        var httpResponse = await _httpClient.SendAsync(requestMessage);

        if (((int) httpResponse.StatusCode) >= 400)
        {
            throw new HttpRequestException();
        }
                
        return await httpResponse.Content.ReadAsStringAsync();
    }
}