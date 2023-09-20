namespace OdataPlayground.Configs;

public class Client: HttpClient
{
    private readonly HttpClient _httpClient;

    public Client(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetAsyncAsString(string url)
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

        using var httpResponseStreamReader = new StreamReader(new BufferedStream(await httpResponse.Content.ReadAsStreamAsync()));
        return await httpResponseStreamReader.ReadToEndAsync();
    }
}