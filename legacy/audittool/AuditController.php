<?php

namespace App\Http\Controllers\Tool;
use DOMDocument;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Http;
use App\Models\AuditData;
use App\Models\AuditDataField;
use App\Jobs\SaveAuditJob;
// use GuzzleHttp\Client;
// use DOMDocument;
// use DOMXPath;
use Dompdf\Dompdf;
use Dompdf\Options;
use View, PDF, File;

class AuditController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $clientVal;
    public function __construct()
    {
        $this->clientVal = new Client([
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            ],
        ]);
    }

    /**
     * @param html Page html string.
     * @param tag Name of the tag.
     *
     * @return get listed tag html.
     */
    protected function getTagData($html, $tag)
    {
        $dom = new \DOMDocument;
        @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $tagData = $dom->getElementsByTagName($tag);

        return $tagData;
    }

    /**
     * @param html Page html string.
     * @param tag Name of the tag.
     *
     * @return generate tags.
     */
    protected function getTags($html, $tag)
    {
        $tagData = $this->getTagData($html, $tag);
        $tagValues = [];

        foreach ($tagData as $valTag) {
            $tagValues[] = $valTag->nodeValue;
        }

        return $tagValues;
    }

    /**
     * @param html Page html string.
     *
     * @return check if page has 404 error.
     */
    protected function check404Error($response = null, $html = '')
    {
        $check = false;
        $status = ($response->getStatusCode() == 404) ? true : false;

        if (!$status) {
            $status = (str_contains($html, 'Page Not Found') || str_contains($html, 'Page not found') || str_contains($html, '404 Page')) ? true : false;
        }

        return $check;
    }

    /**
     * @param href anchor tag url
     * @return check empty url.
     */
    protected function checkEmptyUrl($href)
    {
        $check = false;

        if (!is_string($href) || empty($href) || $href == '#' || $href == '/#' || $href == 'javascript:void(0);' || $href == 'javascript:void();' || $href == 'javascript:void(0)' || $href == 'javascript:void()') {
            $check = true;
        }

        return $check;
    }

    /**
     * @param url the url of the site
     * @param href anchor tag url
     *
     * @return generate all url's with host.
     */
    protected function urlGrnerator($url, $href)
    {
        if (!filter_var($href, FILTER_VALIDATE_URL)) {
            $url = rtrim($url, '/');
            $href = ($href && $href[0] == '/') ? $url . $href : $url . '/' . $href;
        }

        return $href;
    }

    /**
     * @param html Page html string.
     * @param tag Name of the tag.
     *
     * @return remove meta tags.
     */
    protected function removeTagValue($html, $tag)
    {
        $dom = new \DOMDocument;
        // $dom->loadHTML($html);
        @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $xpath = new \DOMXPath($dom);
        $ogTitleNodes = $xpath->query("//meta[@name='$tag']");

        foreach ($ogTitleNodes as $ogTitleNode) {
            $ogTitleNode->parentNode->removeChild($ogTitleNode);
        }

        return $dom->saveHTML();
    }

    /**
     * @param html Page html string.
     * @param tag Name of the tag.
     * @param class Name of the class for any html tag.
     *
     * @return remove meta tags.
     */
    protected function removeDivValue($html, $tag, $class = '')
    {
        $dom = new \DOMDocument;
        // $dom->loadHTML($html);
        @$dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $query = "//$tag";
        $query .= ($class) ? "[@class='$class']" : '';

        $xpath = new \DOMXPath($dom);
        $divs = $xpath->query($query);

        foreach ($divs as $div) {
            $div->parentNode->removeChild($div);
        }

        return $dom->saveHTML();
    }

    /**
     * @param html Page html string.
     * @param url the url of the site
     *
     * @return generate images without alt tag.
     */
    protected function checkImgTags($html, $url)
    {
        $tagData = $this->getTagData($html, 'img');
        $tagValues = [];

        foreach ($tagData as $valTag) {
            if ($valTag && !$valTag->getAttribute('alt')) {
                $tagValues[] = $this->urlGrnerator($url, $valTag->getAttribute('src'));
            }
        }

        return $tagValues;
    }

    /**
     * @param html Page html string.
     *
     * @return get all og tag values.
     */
    protected function getAllOGMetaTags($html)
    {
        $metaTags = $this->getTagData($html, 'meta');
        $ogMetaTags = [];

        foreach ($metaTags as $metaTag) {
            $property = $metaTag->getAttribute('property');
            $content = $metaTag->getAttribute('content');

            if (strpos($property, 'og:') === 0) {
                $ogMetaTags[str_replace('og:', '', $property)] = $content;
            }
        }

        return $ogMetaTags;
    }

    /**
     * @param html Page html string.
     * @param tag Name of the tag.
     *
     * @return get meta tags values.
     */
    protected function getCheckedMetaTags($html, $tag = 'description')
    {
        $metaTags = $this->getTagData($html, 'meta');
        $values = '';

        foreach ($metaTags as $metaTag) {
            $property = $metaTag->getAttribute('name');

            if ($property == $tag) {
                $content = $metaTag->getAttribute('content');
                $values = $content;
            }
        }

        return $values;
    }

    /**
     * @param html Page html string.
     *
     * @return generate canonical tag.
     */
    protected function checkCanonicalTags($html)
    {
        $tagData = $this->getTagData($html, 'link');
        $tagValues = [];

        foreach ($tagData as $valTag) {
            if ($valTag->hasAttribute('rel') && $valTag->getAttribute('rel') == 'canonical') {
                $tagValues[] = $valTag->getAttribute('href');
            }
        }

        return $tagValues;
    }

    /**
     * @param crawled the object from Crawler function.
     * @param val Name of the tag.
     *
     * @return generate metas values.
     */
    // protected function generateMetas($crawler, $val) {
    //     $meta = $crawler->filter("meta[name='$val']")->attr('content');

    //     return $meta;
    // }
    protected function generateMetas($crawler, $val)
    {
        $meta = '';
        $detail = $crawler->filter("meta[name='$val']");
        if ($detail->count() > 0) {
            $meta = $detail->attr('content');
        }

        return $meta;
    }

    /**
     * @param data
     * @param baseHost the host of the site
     *
     * @return check if domains are same or not.
     */
    protected function isSameDomain($baseHost, $url)
    {
        $urlHost = preg_replace('#^www\.(.+\.)#i', '$1', parse_url($url, PHP_URL_HOST));
        $check = false;

        if ($urlHost == $baseHost || $urlHost == '') {
            return true;
        }

        return $check;
    }

    /**
     * @param html Page html string.
     * @param baseurl the url of the site
     *
     * @return check internal and external links.
     */
    protected function countInternalAndExternalLinks($html, $baseURL)
    {
        $html = $this->removeDivValue($html, 'header');
        $html = $this->removeDivValue($html, 'nav');

        $aTags = $this->getTagData($html, 'a');
        $internalLinks = $externalLinks = 0;
        $baseHost = preg_replace('#^www\.(.+\.)#i', '$1', parse_url($baseURL, PHP_URL_HOST));

        foreach ($aTags as $aTag) {
            $href = $aTag->getAttribute('href');

            if ($this->checkEmptyUrl($href)) {
                continue;
            }

            // Check if the URL is internal or external
            if ($this->isSameDomain($baseHost, $href)) {
                $internalLinks++;
            } else {
                $externalLinks++;
            }
        }

        return array('internal' => $internalLinks, 'external' => $externalLinks);
    }

    /**
     * @param url the url of the site
     * @param file The file who's data needs to be fetched.
     *
     * @return check if url's are 404 or not.
     */
    protected function checkUrl($url, $file = '/robots.txt', $html)
    {
        $robotsTxtUrl = rtrim($url, '/') . $file;
        $status = false;
        $statusCode = '404';
        $_html = '';

        try {
            $client = $this->clientVal;
            $response = $client->get($robotsTxtUrl);
            $status = ($response->getStatusCode() == 404) ? false : true;

            if (!$status) {
                $status = (str_contains($html, 'Page Not Found') || str_contains($html, 'Not Found')) ? false : true;
            }

            if ($status) {
                $statusCode = $response->getStatusCode();
                $_html = $response->getBody()->getContents();
            }

            return array('status' => $statusCode, 'text' => $_html);
        } catch (\Exception $e) {
            return array('status' => $statusCode, 'text' => $_html);
        }
    }

    /**
     * @param html Page html string.
     *
     * @return Check for favicon icon.
     */

    /**
     * @param client Http client value
     * @param url the url of the site
     *
     * @return check www and non-www same or not.
     */
    protected function areWwwAndNonWwwEqual($client, $url)
    {
        $main = parse_url($url);
        $url = str_replace('www.', '', $url);
        $wwwUrl = $main['scheme'] . '://www.' . parse_url($url, PHP_URL_HOST);
        $nonWwwUrl = $main['scheme'] . '://' . parse_url($url, PHP_URL_HOST);

        try {
            $responseWww = $client->get($wwwUrl);
            $responseNonWww = $client->get($nonWwwUrl);

            $wwwHtml = $this->removeDivValue($responseWww->getBody()->getContents(), 'head');
            $noWwwHtml = $this->removeDivValue($responseNonWww->getBody()->getContents(), 'head');

            // Compare the responses
            return $wwwHtml == $noWwwHtml;
        } catch (\Exception $e) {
            // Handle errors, e.g., if one version of the URL is not reachable
            // return $e->getMessage();
            return false;
        }
    }

    /**
     * @param html Page html string.
     *
     * @return Get schema tag with code.
     */
    protected function getSchemaTags($html)
    {
        $schemaTags = [];
        $scriptTags = $this->getTagData($html, 'script');

        foreach ($scriptTags as $scriptTag) {
            if ($scriptTag->getAttribute('type') && $scriptTag->getAttribute('type') === 'application/ld+json') {
                $schemaTags[] = $scriptTag->nodeValue;
            }
        }

        return $schemaTags;
    }

    /**
     * @param crawled the object from Crawler function.
     *
     * @return Get social media url's from site.
     */
    protected function getSocialMediaUrls($crawler)
    {
        try {
            // Define CSS selectors for elements containing social media links
            $socialMediaSelectors = [
                'a[href*="facebook.com"]',
                'a[href*="twitter.com"]',
                'a[href*="linkedin.com"]',
                'a[href*="pinterest.com"]',
                'a[href*="instagram.com"]',
            ];

            $socialMediaUrls = [];

            foreach ($socialMediaSelectors as $selector) {
                $links = $crawler->filter($selector);
                foreach ($links as $link) {
                    // if ($link->count() > 0) {
                    $socialMediaUrls[] = $link->getAttribute('href');
                    // }
                }
            }

            return $socialMediaUrls;
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * @param client Http client value
     * @param url the url of the site
     *
     * @return check if http and https have same data.
     */
    protected function areHttpAndHttpsEquivalent($client, $url)
    {
        try {
            $url = preg_replace('#^www\.(.+\.)#i', '$1', parse_url($url, PHP_URL_HOST));

            // Fetch content over HTTPS
            $responseHttps = $client->get('https://' . $url);
            $contentHttps = $this->removeTagValue($responseHttps->getBody()->getContents(), 'csrf-token');

            // Fetch content over HTTP
            $responseHttp = $client->get('http://' . $url);
            $contentHttp = $this->removeTagValue($responseHttp->getBody()->getContents(), 'csrf-token');

            // Check if the content is the same
            return $contentHttps === $contentHttp;
        } catch (\Exception $e) {
            // Handle request or comparison errors
            return (string) $e;
        }
    }

    /**
     * @param client Http client value
     * @param html Fetched html from the url
     * @param url the url of the site
     *
     * @return find all broken links.
     */
    protected function findBrokenLinks($client, $html, $url)
    {
        try {
            $html = $this->removeDivValue($html, 'header');
            $html = $this->removeDivValue($html, 'nav');
            $html = $this->removeDivValue($html, 'footer');
            $links = $this->getTagData($html, 'a');
            $linkCount = $links->length;
            $brokenLinks = [];
            $chunkSize = 10;

            // Process links in chunks
            for ($i = 0; $i < $linkCount; $i += $chunkSize) {
                $chunk = array_slice(iterator_to_array($links, false), $i, $chunkSize);

                foreach ($chunk as $link) {
                    $href = $link->getAttribute('href');
                    if ($this->checkEmptyUrl($href)) {
                        continue;
                    }

                    try {
                        $href = $this->urlGrnerator($url, $href);
                        $linkResponse = $client->get($href);

                        // Check if the status code indicates an error (e.g., 404 Not Found)
                        if ($linkResponse->getStatusCode() >= 400) {
                            $brokenLinks[] = [
                                'url' => $href,
                                'status' => $linkResponse->getStatusCode(),
                                'reason' => $linkResponse->getReasonPhrase(),
                            ];
                        }
                    } catch (\Exception $e) {
                        // Handle errors during the request (e.g., connection issues)
                        $brokenLinks[] = [
                            'url' => $href,
                            'error' => $e->getMessage(),
                        ];
                    }
                }
            }

            return $brokenLinks;
        } catch (\Exception $e) {
            // Handle errors during the main request
            return [['error' => $e->getMessage()]];
        }
    }

    /**
     * @param client Http client value
     * @param url the url of the site
     *
     * @return get redirect urls.
     */
    function getRedirections($client, $url)
    {
        try {
            $response = $client->request('GET', $url, ['allow_redirects' => false]);
            $redirects = [];

            // Check if the response has a redirection status code
            if ($response->getStatusCode() >= 300 && $response->getStatusCode() < 400) {
                $redirectUrl = $response->getHeaderLine('Location');
                $redirects = [
                    'isRedirect' => true,
                    'originalUrl' => $url,
                    'redirectUrl' => $redirectUrl,
                ];
            } else {
                $redirects = [
                    'isRedirect' => false,
                    'originalUrl' => $url,
                ];
            }
        } catch (\Exception $e) {
            $redirects = [
                'error' => $e->getMessage(),
            ];
        }

        return $redirects;
    }

    /**
     * @param client Http client value
     * @param url the url of the site
     *
     * @return check if page 404 not found.
     */
    protected function checkNotFoundPages($client, $url)
    {
        $notFoundPages = [];

        foreach ($url as $url) {
            try {
                $response = $client->get($url);

                // Check if the response status code indicates a "not found" error (404)
                if ($response->getStatusCode() === 404) {
                    $notFoundPages[] = [
                        'url' => $url,
                        'status' => $response->getStatusCode(),
                        'reason' => $response->getReasonPhrase(),
                    ];
                }
            } catch (\Exception $e) {
                // Handle other errors (e.g., network issues)
                $notFoundPages[] = [
                    'url' => $url,
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $notFoundPages;
    }

    /**
     * @param client Http client value
     * @param url the url of the site
     *
     * @return call client for the html.
     */
    protected function curlRequestCall($client, $url)
    {
        try {
            $response = $client->get($url);
            // $html = (string) $response->getBody()->getContents();

            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse();
            $code = $response->getStatusCode();

            if ($e->hasResponse() && $code < 500) {
                // $html = (string) $response->getBody()->getContents();
                return $response;
            }

            return ['error' => $e->getMessage(), 'status' => $code];
        }
    }

    /**
     * @param data the values fetched from speed api.
     * 
     * @return call client for the html.
     */
    protected function generateSpeedValues($data)
    {
        $passedAudits = $warningAudits = $failedAudits = $totalTasks = 0;

        foreach ($data['lighthouseResult']['audits'] as $audit) {
            if (isset($audit['details']['items']) && count($audit['details']['items']) > 0) {
                $totalTasks++;
                $auditScore = $audit['score'];
                switch (true) {
                    case $auditScore >= 0.9:
                        $passedAudits++;
                        break;
                    case $auditScore >= 0.5:
                        $warningAudits++;
                        break;
                    default:
                        $failedAudits++;
                        break;
                }
            }
        }


        $pageSpeedTest = array(
            // 'url' => $url,
            'speed' => $data['lighthouseResult']['categories']['performance']['score'] * 100,
            'passed' => $passedAudits,
            'warning' => $warningAudits,
            'failed' => $failedAudits,
            'total' => $totalTasks,
        );

        return $pageSpeedTest;
    }

    /**
     * @param request The basic laravel function to get all data.
     *
     * @return index function for audits.
     */
    public function index(Request $request, $html)
    {
        $url = $request->url;
        $data = array();
        $client = $this->clientVal;
        $response = $this->curlRequestCall($client, $url);

        if ($response && isset($response->error)) {
            $data['error'] = $html;
        } else {
            $html = (string) $response->getBody()->getContents();
            print_r($html);
            die('index');
            $crawler = new Crawler($html);
            $title = '';

            if ($crawler->filter('title')->count() > 0) {
                $title = $crawler->filter('title')->text();
            }

            $data['html'] = $html;
            $data['response'] = $response->getBody();
            $data['h1'] = $this->getTags($html, 'h1');
            $data['h2'] = $this->getTags($html, 'h2');
            $data['h3'] = $this->getTags($html, 'h3');
            $data['h4'] = $this->getTags($html, 'h4');
            $data['h5'] = $this->getTags($html, 'h5');
            $data['h6'] = $this->getTags($html, 'h6');

            $data['withoutAlt'] = $this->checkImgTags($html, $url);
            $data['noIndex'] = $this->getCheckedMetaTags($html, 'robots');
            $data['favicon'] = $this->checkFavicon($html);
            $data['title'] = $title;
            $data['metaDescription'] = $this->generateMetas($crawler, 'description');
            // $data['metaKeywords'] = $this->generateMetas($crawler, 'keywords');

            $data['404'] = $this->check404Error($response, $html);
        }

        $value['render'] = view('appends.audit.basic-info', $data)->render();
        $value['data'] = $data;

        return response()->json($value);
    }

    /**
     * @param request The basic laravel function to get all data.
     *
     * @return get all advanced information data.
     */
    public function advancedInfoData(Request $request, $html)
    {
        $url = $request->url;
        $data = array();
        $client = $this->clientVal;
        $response = $this->curlRequestCall($client, $url);

        if ($response && isset($response->error)) {
            $data['error'] = $html;
        } else {
            $html = (string) $response->getBody()->getContents();
            print_r($html);
            die('advanced');

            $crawler = new Crawler($html);

            $data['canonical'] = $this->checkCanonicalTags($html);
            $data['hasRobot'] = $this->checkUrl($url);
            $data['sitemap'] = $this->checkUrl($url, '/sitemap.xml');

            $data['page404'] = "";

            $data['schemas'] = $this->getSchemaTags($html);
            $data['socialIcons'] = $this->getSocialMediaUrls($crawler);
            $data['ogTags'] = $this->getAllOGMetaTags($html);
            $data['sameHttpHttps'] = $this->areHttpAndHttpsEquivalent($client, $url);
            $data['brokenLinks'] = $this->findBrokenLinks($client, $html, $url);
        }

        $value['render'] = view('appends.audit.advance-info', $data)->render();
        $value['data'] = $data;

        return response()->json($value);
    }

    /**
     * @param request The basic laravel function to get all data.
     *
     * @return get all preformance data.
     */
    public function preformanceData(Request $request, $html)
    {
        $url = $request->url;
        $data = array();
        $client = $this->clientVal;
        $response = $this->curlRequestCall($client, $url);

        if ($response && isset($response->error)) {
            $data['error'] = $html;
        } else {
            $html = (string) $response->getBody()->getContents();

            $data['redirects'] = $this->getRedirections($client, $url);
            $data['wwworNot'] = $this->areWwwAndNonWwwEqual($client, $url);
            $data['links'] = $this->countInternalAndExternalLinks($html, $url);
        }

        $value['render'] = view('appends.audit.preformance', $data)->render();
        $value['data'] = $data;

        return response()->json($value);
    }

    /**
     * @param $request The basic laravel function to get all data.
     * 
     * @return get page speed score.
     */
    public function getGooglePageSpeedScore(Request $request)
    {
        $url = $request->input('url');

        // $exist_link = AuditData::where('link', $url)->first();
        // if ($exist_link) {
        //     $exist_data = AuditDataField::where('link_id', $exist_link->id)->first();
        //     if ($exist_data->speed) {
        //         return $exist_data->speed;
        //     }
        // }
        $client = $this->clientVal;

        $values = [
            'info' => 'Speed',
            'status' => 404,
            'data' => [],
            'message' => 'Unable to retrieve speed score.'
        ];


        try {
            // Fetch Mobile PageSpeed score using GET method
            $mobileResponse = $client->get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', [
                'query' => [
                    'url' => $url,
                    'key' => 'AIzaSyDT9H1dgnuNDk0E7iEwm0rzj503moPrI0Y',
                    'strategy' => 'mobile', // Specify mobile strategy
                ],
            ]);

            $mobileData = json_decode($mobileResponse->getBody(), true);

            // Fetch Desktop PageSpeed score using GET method
            $desktopResponse = $client->get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', [
                'query' => [
                    'url' => $url,
                    'key' => 'AIzaSyDT9H1dgnuNDk0E7iEwm0rzj503moPrI0Y',
                    'strategy' => 'desktop', // Specify desktop strategy
                ],
            ]);

            $desktopData = json_decode($desktopResponse->getBody(), true);

            // Extract mobile and desktop scores
            $mobileScore = isset($mobileData['lighthouseResult']['categories']['performance']['score'])
                ? $mobileData['lighthouseResult']['categories']['performance']['score'] * 100
                : null;

            $desktopScore = isset($desktopData['lighthouseResult']['categories']['performance']['score'])
                ? $desktopData['lighthouseResult']['categories']['performance']['score'] * 100
                : null;

            // Extract usability data
            $usabilityData = [
                'performance_score' => isset($mobileData['lighthouseResult']['categories']['performance']['score'])
                    ? $mobileData['lighthouseResult']['categories']['performance']['score'] * 100
                    : null,
                'accessibility_score' => isset($mobileData['lighthouseResult']['categories']['accessibility']['score'])
                    ? $mobileData['lighthouseResult']['categories']['accessibility']['score'] * 100
                    : null,
                'seo_score' => isset($mobileData['lighthouseResult']['categories']['seo']['score'])
                    ? $mobileData['lighthouseResult']['categories']['seo']['score'] * 100
                    : null,
                'first_contentful_paint' => isset($mobileData['lighthouseResult']['audits']['first-contentful-paint']['displayValue'])
                    ? $mobileData['lighthouseResult']['audits']['first-contentful-paint']['displayValue']
                    : null,
                'largest_contentful_paint' => isset($mobileData['lighthouseResult']['audits']['largest-contentful-paint']['displayValue'])
                    ? $mobileData['lighthouseResult']['audits']['largest-contentful-paint']['displayValue']
                    : null,
                'cumulative_layout_shift' => isset($mobileData['lighthouseResult']['audits']['cumulative-layout-shift']['displayValue'])
                    ? $mobileData['lighthouseResult']['audits']['cumulative-layout-shift']['displayValue']
                    : null,
            ];

            // Extract page size and breakdown details
            $totalPageSize = $mobileData['lighthouseResult']['audits']['total-byte-weight']['numericValue'] ?? null;
            $resourceSummary = $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'] ?? [];

            // Prepare breakdown data
            $breakdown = [];
            foreach ($resourceSummary as $resource) {
                $breakdown[$resource['label']] = $resource['transferSize'];
            }

            // Convert totalPageSize to MB
            $totalPageSizeMB = $totalPageSize ? round($totalPageSize / (1024 * 1024), 2) : null;

            // Extract performance data (adjusting to use $mobileData)
            $performanceData = [
                'server_response' => $mobileData['lighthouseResult']['audits']['server-response-time']['numericValue'] ?? null,
                'all_page_content_loaded' => $mobileData['lighthouseResult']['audits']['interactive']['numericValue'] ?? null,
                'all_page_script_complete' => $mobileData['lighthouseResult']['audits']['dom-content-loaded']['numericValue'] ?? null,
                'totalPageSize' => $totalPageSizeMB,
                'breakdown' => [
                    'html' => isset($breakdown['Document']) ? round($breakdown['Document'] / (1024 * 1024), 2) : 0,
                    'css' => isset($breakdown['Stylesheet']) ? round($breakdown['Stylesheet'] / (1024 * 1024), 2) : 0,
                    'js' => isset($breakdown['Script']) ? round($breakdown['Script'] / (1024 * 1024), 2) : 0,
                    'images' => isset($breakdown['Image']) ? round($breakdown['Image'] / (1024 * 1024), 2) : 0,
                    'font' => isset($breakdown['Font']) ? round($breakdown['Font'] / (1024 * 1024), 2) : 0,
                    'other' => isset($breakdown['Other']) ? round($breakdown['Other'] / (1024 * 1024), 2) : 0,
                ],
                'number_of_resources' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][0]['requestCount'] ?? null,
                'compression_count_html' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][3]['requestCount'] ?? null,
                'compression_count_css' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][5]['requestCount'] ?? null,
                'compression_count_js' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][1]['requestCount'] ?? null,
                'compression_count_image' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][2]['requestCount'] ?? null,
                'compression_count_other' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'][4]['requestCount'] ?? null,
                'raw_page_size_breakdown' => $mobileData['lighthouseResult']['audits']['resource-summary']['details']['items'] ?? null,

            ];

            // Calculate average usability score
            $scores = array_filter([
                $usabilityData['performance_score'],
                $usabilityData['accessibility_score'],
                $usabilityData['seo_score'],
            ]);

            $averageUsability = count($scores) > 0 ? array_sum($scores) / count($scores) : null;

            // Extract suggestions from mobile result (can be extended to include desktop suggestions)
            $suggestions = isset($mobileData['lighthouseResult']['audits']) ? $this->extractSuggestions($mobileData['lighthouseResult']['audits']) : [];

            // Prepare the response values
            $values['data'] = [
                'mobileScore' => $mobileScore,
                'desktopScore' => $desktopScore,
                'suggestions' => $suggestions,
                'averageUsability' => $averageUsability,
                'usabilityData' => $usabilityData,
                'performanceData' => $performanceData,

            ];

            $values['message'] = 'success';
            $values['status'] = 200;

        } catch (\Exception $e) {
            if (strpos($e->getMessage(), 'NO_FCP') !== false) {
                $values['message'] = 'Page did not load any content. Please check if the URL is accessible or if content is dynamically loaded.';
            } else {
                $values['message'] = $e->getMessage();
            }
        }


        // Return the JSON response
        $values = response()->json(
            $values,
            $values['status']
        );

        // $response = new \stdClass();
        // $response->Speed = $values;
        // SaveAuditJob::dispatch($response, $url);
        return $values;
    }

    // Helper function to extract suggestions
    private function extractSuggestions($audits)
    {
        $suggestions = [];

        foreach ($audits as $key => $audit) {
            if (isset($audit['title']) && isset($audit['description'])) {
                $suggestions[] = [
                    'title' => $audit['title'],
                    'description' => $audit['description'],
                    'scoreImpact' => isset($audit['score']) ? $audit['score'] : 0
                ];
            }
        }

        return $suggestions;
    }



    /**
     * @param pdf The PDF file object which is created.
     * @param name Name of the pdf file.
     * 
     * @return uploaded path of the pdf file.
     */
    protected function upload_pdf($pdf, $name)
    {
        $path = public_path("/pdf/audits");

        if (!File::isDirectory($path)) {
            mkdir($path, 0777, true);
        }

        $pdf->save($path . '/' . $name);

        return "/public/pdf/audits/" . $name;
    }

    /**
     * @param data Values gathered from request.
     * @param filename name of the pdf file to be generate.
     * 
     * @return Pdf file link to downlaod.
     */
    protected function createPdf($data, $filename)
    {
        print_r($data);
        die();
        $pdf = PDF::loadView('appends.audit.pdf-file', $data);
        // $pdf->getDomPDF()->setHttpContext(
        //     stream_context_create([
        //         'ssl' => [
        //             'allow_self_signed'=> TRUE,
        //             'verify_peer' => FALSE,
        //             'verify_peer_name' => FALSE,
        //         ]
        //     ])
        // );

        $pdfFile = $this->upload_pdf($pdf, $filename);
        return $pdfFile;
    }

    /**
     * @param $request The basic laravel function to get all data.
     * 
     * @return The pdf to be generated from the value.
     */
    // public function generatePdf(Request $request)
    // {
    //     $data['file'] = '';

    //     // if(
    //     //     array_key_exists('basicData', $request->all()) ||
    //     //     array_key_exists('preformanceData', $request->all()) ||
    //     //     array_key_exists('advancedData', $request->all())
    //     // ) {
    //     $pdf = $this->createPdf($request, $request->name);
    //     $data['file'] = url($pdf);
    //     // }

    //     return $data;
    // }

    public function checkAll(Request $request)
    {
        $url = $request->input('url');

        $results = [];

        // Fetch HTML content
        $html = $this->fetchHtml($url);
        if ($html === false) {
            return response()->json(['error' => 'Unable to fetch URL.'], 400);
        }

        $dom = $this->loadDom($html);
        return response()->json($results);
    }

    // Fetch HTML content
    public function fetchHtml($url)
    {
        return @file_get_contents($url);
    }

    // Load DOMDocument
    public function loadDom($html)
    {
        $dom = new \DOMDocument();
        @$dom->loadHTML($html);
        return $dom;
    }



    // public function generatePdf(Request $request)
    // {
    //     $url = "https://teqtop.com";  // URL for checking meta tags, headings, and canonical tags

    //     // Call the other checks
    //     $metaDataResponse = $this->checkMetaTags(new Request(['url' => $url]));  // Passing the request to checkMetaTags
    //     $headingDataResponse = $this->checkHeadings(new Request(['url' => $url]));  // Passing the request to checkHeadings
    //     $canonicalDataResponse = $this->checkCanonical(new Request(['url' => $url]));  // Passing the request to checkCanonical

    //     // Decode the JSON responses from checkMetaTags, checkHeadings, and checkCanonical
    //     $metaData = json_decode($metaDataResponse->getContent(), true);
    //     $headingData = json_decode($headingDataResponse->getContent(), true);
    //     $canonicalData = json_decode($canonicalDataResponse->getContent(), true);

    //     // Check if the metaData is valid, if not return an error
    //     if (!$metaData || !isset($metaData['info'])) {
    //         return response()->json([
    //             'error' => 'Failed to fetch meta data.',
    //         ], 400);
    //     }

    //     // Check if the headingData is valid, if not return an error
    //     if (!$headingData || !isset($headingData['info'])) {
    //         return response()->json([
    //             'error' => 'Failed to fetch heading data.',
    //         ], 400);
    //     }

    //     // Check if the canonicalData is valid, if not return an error
    //     if (!$canonicalData || !isset($canonicalData['info'])) {
    //         return response()->json([
    //             'error' => 'Failed to fetch canonical data.',
    //         ], 400);
    //     }

    //     // Prepare the HTML content for the PDF
    //     $htmlContent = '<h1>Meta Tags, Headings, and Canonical Tags API Results Report</h1>';
    //     $htmlContent .= '<table border="1" cellpadding="5" style="width: 100%; border-collapse: collapse;">';
    //     $htmlContent .= '<thead><tr><th style="padding: 8px; background-color: #f2f2f2;">Field</th><th style="padding: 8px; background-color: #f2f2f2;">Value</th></tr></thead><tbody>';

    //     // Add meta information to the table
    //     $htmlContent .= '<tr>';
    //     $htmlContent .= '<td style="padding: 8px; font-weight: bold;">Meta Info</td>';
    //     $htmlContent .= '<td style="padding: 8px;">';

    //     // Check for errors in the meta tags
    //     if (isset($metaData['errors']) && $metaData['errors'] === true) {
    //         $htmlContent .= '<strong>Errors:</strong><ul>';
    //         $htmlContent .= '<li>There were issues with the Meta Title or Description length.</li>';
    //         $htmlContent .= '</ul>';
    //     } else {
    //         $htmlContent .= '<strong>Success:</strong> ' . htmlspecialchars($metaData['info']);
    //     }

    //     // Add meta title and description if available
    //     if (isset($metaData['title1'])) {
    //         $htmlContent .= '<br><strong>Title:</strong> ' . htmlspecialchars($metaData['title1']);
    //     }

    //     if (isset($metaData['title2'])) {
    //         $htmlContent .= '<br><strong>Description:</strong> ' . htmlspecialchars($metaData['title2']);
    //     }

    //     // Add suggestions if available
    //     if (isset($metaData['suggestions'])) {
    //         $htmlContent .= '<br><strong>Suggestions:</strong> ' . htmlspecialchars($metaData['suggestions']);
    //     }

    //     $htmlContent .= '</td>';
    //     $htmlContent .= '</tr>';

    //     // Add heading information to the table
    //     $htmlContent .= '<tr>';
    //     $htmlContent .= '<td style="padding: 8px; font-weight: bold;">Heading Tags Info</td>';
    //     $htmlContent .= '<td style="padding: 8px;">';

    //     // Add heading count data
    //     if (isset($headingData['title1'])) {
    //         $htmlContent .= '<br><strong>Heading Counts:</strong><ul>';
    //         foreach ($headingData['title1'] as $tag => $count) {
    //             $htmlContent .= '<li>' . strtoupper($tag) . ': ' . $count . '</li>';
    //         }
    //         $htmlContent .= '</ul>';
    //     }

    //     // Add actual heading texts if available
    //     if (isset($headingData['headings'])) {
    //         $htmlContent .= '<br><strong>Headings:</strong><ul>';
    //         foreach ($headingData['headings'] as $tag => $headings) {
    //             if (!empty($headings)) {
    //                 $htmlContent .= '<li>' . strtoupper($tag) . ':';
    //                 foreach ($headings as $heading) {
    //                     $htmlContent .= '<br> - ' . htmlspecialchars($heading);
    //                 }
    //                 $htmlContent .= '</li>';
    //             }
    //         }
    //         $htmlContent .= '</ul>';
    //     }

    //     // Add suggestions if available
    //     if (isset($headingData['suggestions'])) {
    //         $htmlContent .= '<br><strong>Suggestions:</strong> ' . htmlspecialchars($headingData['suggestions']);
    //     }

    //     $htmlContent .= '</td>';
    //     $htmlContent .= '</tr>';

    //     // Add canonical tag information to the table
    //     $htmlContent .= '<tr>';
    //     $htmlContent .= '<td style="padding: 8px; font-weight: bold;">Canonical Tags Info</td>';
    //     $htmlContent .= '<td style="padding: 8px;">';

    //     // Check for canonical URL
    //     if (isset($canonicalData['title1']) && $canonicalData['title1'] !== 'Not Found') {
    //         $htmlContent .= '<strong>Canonical URL:</strong> ' . htmlspecialchars($canonicalData['title1']);
    //     } else {
    //         $htmlContent .= '<strong>No canonical tag found.</strong>';
    //     }

    //     // Add suggestions if available
    //     if (isset($canonicalData['suggestions'])) {
    //         $htmlContent .= '<br><strong>Suggestions:</strong> ' . htmlspecialchars($canonicalData['suggestions']);
    //     }

    //     $htmlContent .= '</td>';
    //     $htmlContent .= '</tr>';

    //     // Close the table tag
    //     $htmlContent .= '</tbody></table>';

    //     // Initialize Dompdf with options
    //     $dompdfOptions = new Options();
    //     $dompdfOptions->set('isHtml5ParserEnabled', true);
    //     $dompdfOptions->set('isPhpEnabled', true);
    //     $dompdf = new Dompdf($dompdfOptions);

    //     // Load the HTML content into Dompdf
    //     $dompdf->loadHtml($htmlContent);

    //     // Set paper size and orientation
    //     $dompdf->setPaper('A4', 'landscape');

    //     // Render the PDF (first pass)
    //     $dompdf->render();

    //     // Stream the generated PDF to the browser
    //     return $dompdf->stream("meta_headings_canonical_results_report.pdf", ["Attachment" => 1]);
    // }




    // Meta Tags Check
    public function checkMetaTags(Request $request)
    {
        $url = $request->input('url');

        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return response()->json([
                'info' => 'Meta Tags Check',
                'title1' => '',
                'errors' => 'Invalid URL format.',
                'suggestions' => 'Please provide a valid URL.'
            ], 400);
        }

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Meta Tags Check',
                'title1' => '',
                'errors' => 'Unable to fetch content from the URL.',
                'suggestions' => 'Ensure the URL is accessible and try again.'
            ], 400);
        }

        $dom = $this->loadDom($html);
        $metaTitle = '';
        $metaDescription = '';

        $titleTags = $dom->getElementsByTagName('title');
        if ($titleTags->length > 0) {
            $metaTitle = $titleTags->item(0)->nodeValue;
        }

        foreach ($dom->getElementsByTagName('meta') as $meta) {
            if ($meta->getAttribute('name') === 'description') {
                $metaDescription = $meta->getAttribute('content');
                break;
            }
        }

        $errors = [];

        // Check for the length of the meta title and meta description
        if (strlen($metaTitle) > 60) {
            $errors[] = "Meta Title is too long.";
        }

        if (strlen($metaDescription) > 160) {
            $errors[] = "Meta Description is too long.";
        }

        $values = [
            'info' => empty($errors) ? 'Meta title meta description' : "Meta title meta description - Too Long",
            'title1' => $metaTitle,
            'title2' => $metaDescription,
            'errors' => empty($errors) ? false : true,
            'suggestions' => "Ensure your page's title includes your target keywords, and design it to encourage users to click."
        ];

        return response()->json($values);
    }

    // Headings Check
    public function checkHeadings(Request $request)
    {
        $url = $request->input('url');

        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return response()->json([
                'info' => 'Heading tags',
                'title1' => '',
                'errors' => 'Invalid URL format.',
                'suggestions' => 'Please provide a valid URL.'
            ], 400);
        }

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Heading tags',
                'title1' => '',
                'errors' => 'Unable to fetch content from the URL.',
                'suggestions' => 'Ensure the URL is accessible and try again.'
            ], 400);
        }

        $dom = $this->loadDom($html);
        $headingCounts = [
            'h1' => 0,
            'h2' => 0,
            'h3' => 0,
            'h4' => 0,
            'h5' => 0,
            'h6' => 0
        ];

        $headings = [
            'h1' => [],
            'h2' => [],
            'h3' => [],
            'h4' => [],
            'h5' => [],
            'h6' => []
        ];

        // Loop through heading tags and count occurrences
        foreach (array_keys($headingCounts) as $tag) {
            $nodes = $dom->getElementsByTagName($tag);
            $headingCounts[$tag] = $nodes->length;

            // Store the content of each heading tag
            foreach ($nodes as $node) {
                $headings[$tag][] = trim($node->textContent);
            }
        }

        // Check if there are multiple H1 tags
        $isMultipleH1Tags = $headingCounts['h1'] > 1;

        // Return the result including heading counts and the actual heading texts
        return response()->json([
            'info' => 'Heading tags',
            'title1' => $headingCounts,
            'headings' => $headings,
            'errors' => $isMultipleH1Tags ? false : true,
            'suggestions' => "Ensure your most important keywords appear in the H1 tag naturally."
        ]);
    }

    // Canonical Check
    public function checkCanonical(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Canonical Tags',
                'title1' => '',
                'errors' => true,
                'suggestions' => 'Ensure the URL is correct and accessible.'
            ], 400);
        }

        $dom = new \DOMDocument();
        @$dom->loadHTML($html);

        $canonicalUrl = null;
        $links = $dom->getElementsByTagName('link');

        foreach ($links as $link) {
            if ($link->getAttribute('rel') === 'canonical') {
                $canonicalUrl = $link->getAttribute('href');
                break;
            }
        }

        $values = response()->json([
            'info' => 'Canonical Tags',
            'title1' => 'Canonical Tag',
            'errors' => false,
            'suggestions' => 'Canonical tags help search engines index the correct page.'
        ]);

        return $values;
    }



    // Robots.txt Check
    public function checkRobotsTxt(Request $request)
    {
        $url = $request->input('url');

        $robotsContent = @file_get_contents($url . '/robots.txt');

        // Format content with <br /> for HTML rendering
        $formattedRobotsContent = $robotsContent ? nl2br(htmlspecialchars($robotsContent)) : "robots.txt not found.";

        // Check if the sitemap is present in the robots.txt content
        $sitemapExists = $robotsContent && strpos($robotsContent, 'Sitemap:') !== false;

        $values = response()->json([
            'info' => "Robots.txt",
            'title1' => $sitemapExists ? "Robots.txt" : "Robots.txt.",
            'errors' => $sitemapExists ? false : true,
            'suggestions' => "Ensure the robots.txt file is present and includes a Sitemap link.",
            'robots_content' => $robotsContent 
        ]);

        return $values;
    }

    // Sitemap.xml Check
    public function checkSitemap(Request $request)
    {
        $url = $request->input('url');

        // Ensure the URL is valid
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return response()->json([
                'info' => 'Sitemap.xml check',
                'title1' => '',
                'errors' => true,
                'suggestions' => 'Invalid URL format.'
            ], 400);
        }

        $sitemapUrl = rtrim($url) . '/sitemap.xml';
        $sitemapHeaders = @get_headers($sitemapUrl);

        $needles = ['200 OK', 'application/xml'];
        $found = false;
        
        if ($sitemapHeaders && is_array($sitemapHeaders)) {
            foreach ($sitemapHeaders as $header) {
                foreach ($needles as $needle) {
                    if (strpos($header, $needle) !== false) {
                        $found = true;
                        break 2; // Exit both loops on first match
                    }
                }
            }
        }
        
        $sitemapExists = $found;

        $values = [
            'info' => "Sitemap.xml check",
            'title1' => $sitemapExists ? $sitemapUrl : "Sitemap.xml not found.",
            'errors' => !$sitemapExists,
            'suggestions' => "Make sure the Sitemap.xml file exists and is properly accessible."
        ];

        return response()->json($values);
    }

    // Alt Tags Check
    public function checkAltTags(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Alt Tags Check',
                'title1' => '',
                'errors' => false,
                'suggestions' => ''
            ], 400);
        }

        $dom = $this->loadDom($html);
        $images = $dom->getElementsByTagName('img');
        $missingAlt = [];

        foreach ($images as $img) {
            if (!$img->getAttribute('alt')) {
                $missingAlt[] = $dom->saveHTML($img);
            }
        }

        $hasMissingAltTags = count($missingAlt) > 0;

        return response()->json([
            'info' => 'Alt Tags Check',
            'title1' => $hasMissingAltTags ? "Missing alt tags found." : "All images have alt tags.",
            'errors' => $hasMissingAltTags ? true : false,
            'missing' => $missingAlt,
            'suggestions' => "Add descriptive and relevant alt tags to the following images for better accessibility and SEO."
        ]);
    }


    public function checkSchema(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Schema Check',
                'title1' => '',
                'errors' => false,
                'suggestions' => "Add relevant schema markup (e.g., JSON-LD or Microdata) to improve SEO and enable rich snippets in search results."
            ], 400);
        }

        $dom = $this->loadDom($html);
        $schemaData = [];

        foreach ($dom->getElementsByTagName('script') as $script) {
            if ($script->getAttribute('type') === 'application/ld+json') {
                $decodedSchema = json_decode($script->nodeValue, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $schemaData[] = $decodedSchema;
                } else {
                    return response()->json([
                        'info' => 'Schema Check',
                        'title1' => '',
                        'errors' => false,
                        'suggestions' => "Add relevant schema markup (e.g., JSON-LD or Microdata) to improve SEO and enable rich snippets in search results."
                    ], 400);
                }
            }
        }

        $values = response()->json([
            'info' => 'Schema Check',
            'title1' => count($schemaData) > 0 ? "Schema" : "Schema",
            'errors' => count($schemaData) > 0 ? false : true,
            'schema_data' => count($schemaData) > 0 ? "Schema found" : "Schema not found",
            'suggestions' => "Add relevant schema markup (e.g., JSON-LD or Microdata) to improve SEO and search results."
        ]);

        return $values;
    }


    // Social Links Check
    public function checkSocialLinks(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Social Links Check',
                'title1' => '',
                'errors' => 'Unable to fetch URL.',
                'suggestions' => ''
            ], 400);
        }

        $dom = $this->loadDom($html);
        $socialLinks = [];
        $uniqueLinks = [];

        foreach ($dom->getElementsByTagName('a') as $link) {
            $href = $link->getAttribute('href');
            if ((strpos($href, 'facebook.com') !== false || strpos($href, 'twitter.com') !== false || strpos($href, 'linkedin.com') !== false || strpos($href, 'instagram.com') !== false || strpos($href, 'pinterest.com') !== false) && !in_array($href, $uniqueLinks)) {
                $socialLinks[] = $href;
                $uniqueLinks[] = $href;
            }
        }

        $hasSocialLinks = count($socialLinks) > 0;

        return response()->json([
            'info' => 'Social Links Check',
            'title1' => $hasSocialLinks ? "Social links found." : "No social links found.",
            'errors' => !$hasSocialLinks,
            'links' => $socialLinks,
            'suggestions' => "Consider adding social media links to engage users."
        ]);
    }


    public function checkFavicon(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Favicon Check',
                'title1' => '',
                'errors' => false,
                'suggestions' => "Add a favicon to improve branding and user experience."
            ], 400);
        }

        $dom = $this->loadDom($html);
        $favicon = null;

        foreach ($dom->getElementsByTagName('link') as $link) {
            $rel = $link->getAttribute('rel');
            if (in_array($rel, ['icon', 'shortcut icon', 'apple-touch-icon'])) {
                $favicon = $link->getAttribute('href');
                break;
            }
        }

        if ($favicon && !preg_match('/^(http|https):\/\//', $favicon)) {
            $favicon = rtrim($url, '/') . '/' . ltrim($favicon, '/');
        }

        return response()->json([
            'info' => $favicon ? "Favicon check" : "Favicon check - Not found.",
            'title1' => $favicon ? $favicon : "No favicon found.",
            'errors' => !$favicon,
            'suggestions' => "Add a favicon to improve branding and user experience."
        ]);
    }



    // OG Tags Check
    public function checkOgTags(Request $request)
    {
        $url = $request->input('url');

        // Check if the link already exists in the database
        // $exist_link = AuditData::where('link', $url)->first();
        // if ($exist_link) {
        //     $exist_data = AuditDataField::where('link_id', $exist_link->id)->first();
        //     if ($exist_data && $exist_data->og_tags) {
        //         return response()->json(json_decode($exist_data->og_tags, true));
        //     }
        // }

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json(['error' => 'Unable to fetch URL.'], 400);
        }
        $dom = $this->loadDom($html);
        $ogTags = [];

        foreach ($dom->getElementsByTagName('meta') as $meta) {
            if (strpos($meta->getAttribute('property'), 'og:') === 0) {
                $ogTags[] = [
                    'property' => $meta->getAttribute('property'),
                    'content' => $meta->getAttribute('content'),
                ];
            }
        }

        $values = [
            'info' => 'OG Tags',
            'title1' => count($ogTags) > 0 ? "OG tags found." : "No OG tags found.",
            'errors' => count($ogTags) > 0 ? false : true,
            'suggestions' => "Ensure your content is displayed correctly when shared on social media platforms.",
            'ogTags' => $ogTags
        ];

        // // Save the audit data to the database
        // if ($exist_link) {
        //     $exist_data->og_tags = json_encode($values);
        //     $exist_data->save();
        // } else {
        //     $new_link = AuditData::create(['link' => $url]);
        //     AuditDataField::create([
        //         'link_id' => $new_link->id,
        //         'og_tags' => json_encode($values)
        //     ]);
        // }

        // // Dispatch a job to save the audit data
        // SaveAuditJob::dispatch($values, $url);

        return response()->json($values);
    }


    // Noindex Check
    public function checkNoindex(Request $request)
    {
        $url = $request->input('url');
        $robotsResponse = $this->checkRobotsTxt($request);
        $robotsContent = $robotsResponse->getData()->robots_content;

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Noindex Tag Check',
                'title1' => '',
                'errors' => true,
                'suggestions' => 'Ensure the URL is correct and accessible.'
            ], 400);
        }

        $dom = $this->loadDom($html);
        $noindexFound = false;

        foreach ($dom->getElementsByTagName('meta') as $meta) {
            if ($meta->getAttribute('name') === 'robots' && strpos($meta->getAttribute('content'), 'noindex') !== false) {
                $noindexFound = true;
                break;
            }
        }

        $robotsNoindex = strpos($robotsContent, 'noindex') !== false;

        $values = response()->json([
            'info' => 'Noindex Tag Check',
            'title1' => "Noindex tag",
            'errors' => ($noindexFound ? true : false),
            'suggestions' => "Prevents the page from being indexed by search engines."
        ]);

        return $values;
    }


    // HTTP/HTTPS Check
    public function checkHttpHttps(Request $request)
    {
        $url = $request->input('url');

        $isHttps = strpos($url, 'https://') === 0;

        $values = response()->json([
            'info' => 'HTTP/HTTPS Check',
            'title1' => $isHttps ? "HTTPS" : "HTTP",
            'errors' => $isHttps ? false : true, 
            'suggestions' => 'Switch to HTTPS to secure your website.',
        ]);

        return $values;
    }



    // 404 Error Check
    public function check404Errors(Request $request)
    {
        $url = $request->input('url');
        $html = $this->fetchHtml($url);

        // Check if the URL could not be fetched
        if ($html === false) {
            return response()->json([
                'info' => '404 Errors Check',
                'title1' => '',
                'errors' => 'Unable to fetch URL.',
                'suggestions' => ''
            ], 400);
        }

        // Load the HTML and collect links
        $dom = $this->loadDom($html);
        $links = [];
        foreach ($dom->getElementsByTagName('a') as $link) {
            $href = $link->getAttribute('href');
            if (filter_var($href, FILTER_VALIDATE_URL)) {
                $links[] = $href;
            }
        }

        // Check for broken links
        $brokenLinks = array_filter($links, function ($link) {
            return strpos(@get_headers($link)[0], '404') !== false;
        });

        // Prepare the response
        return response()->json([
            'info' => '404 Errors Check',
            'title1' => "Broken links",
            'errors' => !empty($brokenLinks), // True if broken links are found
            'suggestions' => !empty($brokenLinks)
                ? "Fix the following broken links: " . implode(', ', $brokenLinks)
                : "No broken links detected. No action needed."
        ]);
    }


    // Broken Links Check
    public function checkBrokenLinks(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'Broken Links Check',
                'title1' => 'Enter valid url',
                'errors' => true,
                'suggestions' => 'Consider updating or removing these links to improve user experience.'
            ], 400);
        }

        $dom = $this->loadDom($html);
        $links = [];

        $base = parse_url($url);

        foreach ($dom->getElementsByTagName('a') as $link) {
            $href = $link->getAttribute('href');
            if (!empty($href)) {
                if (strpos($href, 'http') !== 0) {
                    $href = $base['scheme'] . '://' . $base['host'] . '/' . ltrim($href, '/');
                }
                $links[] = $href;
            }
        }

        $brokenLinks = $this->checkMultipleLinks($links);

        $values = response()->json([
            'info' => 'Broken Links Check',
            'title1' => "Broken links",
            'errors' => !empty($brokenLinks),
            'suggestions' => "Consider updating or removing these links to improve user experience.",
            'brokenLinks' => $brokenLinks
        ]);

        return $values;
    }

    public function checkMultipleLinks($links)
    {
        $multiCurl = curl_multi_init();
        $curlHandles = [];
        $results = [];

        foreach ($links as $i => $link) {
            $curlHandles[$i] = curl_init($link);
            curl_setopt($curlHandles[$i], CURLOPT_NOBODY, true);
            curl_setopt($curlHandles[$i], CURLOPT_TIMEOUT, 5);
            curl_setopt($curlHandles[$i], CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; LinkChecker/1.0)');
            curl_setopt($curlHandles[$i], CURLOPT_RETURNTRANSFER, true);
            curl_multi_add_handle($multiCurl, $curlHandles[$i]);
        }

        $running = null;
        do {
            curl_multi_exec($multiCurl, $running);
            curl_multi_select($multiCurl);
        } while ($running > 0);

        foreach ($curlHandles as $i => $ch) {
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($httpCode == 404 || $httpCode == 500) {
                $results[] = $links[$i];
            }
            curl_multi_remove_handle($multiCurl, $ch);
            curl_close($ch);
        }

        curl_multi_close($multiCurl);

        return $results;
    }

    public function checkLinks(Request $request)
    {
        $url = $request->input('url');
        // $exist_link = AuditData::where('link', $url)->first();
        // if ($exist_link) {
        //     $exist_data = AuditDataField::where('link_id', $exist_link->id)->first();
        //     if ($exist_data->internal_external_links) {
        //         return $exist_data->internal_external_links;
        //     }
        // }

        $html = $this->fetchHtml($url);

        // Check if the URL could not be fetched
        if ($html === false) {
            return response()->json([
                'info' => 'Internal/External Links Check',
                'title1' => '',
                'errors' => 'Unable to fetch URL.',
                'suggestions' => ''
            ], 400);
        }

        // Load the HTML DOM
        $dom = $this->loadDom($html);
        $baseUrl = parse_url($url, PHP_URL_HOST);
        $externalLinks = [];
        $internalLinks = [];

        // Collect internal and external links
        foreach ($dom->getElementsByTagName('a') as $link) {
            $href = $link->getAttribute('href');
            if (!empty($href)) {
                // Check if the link is external or internal
                if (strpos($href, $baseUrl) === false) {
                    $externalLinks[] = $href; // External link
                } else {
                    $internalLinks[] = $href; // Internal link
                }
            }
        }

        // Prepare suggestions based on found links
        $suggestions = [];
        if (!empty($externalLinks)) {
            $suggestions[] = "Ensure they are still active.";
        } else {
            $suggestions[] = "Relevant external resources.";
        }

        if (!empty($internalLinks)) {
            $suggestions[] = "Internal links for proper navigation.";
        } else {
            $suggestions[] = "Site's navigation is functional.";
        }

        // Return the response with the links and suggestions
        $values = response()->json([
            'info' => 'Internal/External Links Check',
            'title1' => count($externalLinks) > 0 ? "Links found." : "No links found.",
            'errors' => empty($externalLinks) && empty($internalLinks) ? false : true,
            'external_links' => $externalLinks,
            'internal_links' => $internalLinks,
            'suggestions' => implode(' ', $suggestions), // Join suggestions into a single string
        ]);

        // $response = new \stdClass();
        // $response->Links = $values;
        // SaveAuditJob::dispatch($response, $url);
        return $values;
    }




    // www vs non-www Links Check
    public function checkWwwConsistency(Request $request)
    {
        $url = $request->input('url');

        $html = $this->fetchHtml($url);

        if ($html === false) {
            return response()->json([
                'info' => 'www vs non-www Links Check',
                'title1' => '',
                'errors' => 'Unable to fetch URL.',
                'suggestions' => ''
            ], 400);
        }

        $dom = $this->loadDom($html);
        $wwwLinks = [];
        $nonWwwLinks = [];

        $inputHost = parse_url($url, PHP_URL_HOST);
        if (strpos($inputHost, 'www.') === 0) {
            $inputHostNoWww = substr($inputHost, 4);
        } else {
            $inputHostNoWww = $inputHost;
        }

        foreach ($dom->getElementsByTagName('a') as $link) {
            $href = $link->getAttribute('href');
            // Only check absolute or protocol-relative URLs
            if (preg_match('#^(https?:)?//#', $href)) {
                // Normalize protocol-relative URLs
                if (strpos($href, '//') === 0) {
                    $href = 'http:' . $href;
                }
                $host = parse_url($href, PHP_URL_HOST);
                if (!$host) continue;
                // Only check links for the same domain (ignoring www)
                $hostNoWww = (strpos($host, 'www.') === 0) ? substr($host, 4) : $host;
                if (strcasecmp($hostNoWww, $inputHostNoWww) !== 0) continue;

                if (strpos($host, 'www.') === 0) {
                    $wwwLinks[] = $href;
                } else {
                    $nonWwwLinks[] = $href;
                }
            }
        }

        $values = response()->json([
            'info' => 'www vs non-www Links Check',
            'title1' => "www vs non-www",
            'errors' => !empty($nonWwwLinks),
            'www_links' => $wwwLinks,
            'non_www_links' => $nonWwwLinks,
            'suggestions' => "Ensure consistent use of www or non-www URLs."
        ]);

        return $values;
    }

    // Redirects Check
    public function checkRedirects(Request $request)
    {
        $url = $request->input('url');

        $headers = @get_headers($url);

        if ($headers === false) {
            return response()->json([
                'info' => 'Redirects Check',
                'title1' => '',
                'errors' => 'Unable to fetch URL headers.',
                'suggestions' => 'Ensure the URL is correct and accessible.'
            ], 400);
        }

        $redirects = [];
        foreach ($headers as $header) {
            if (strpos($header, 'Location:') !== false) {
                $redirects[] = trim(str_replace('Location:', '', $header));
            }
        }

        $values = response()->json([
            'info' => 'Redirects Check',
            'title1' => "Redirects",
            'errors' => count($redirects) !== 0,
            'redirects' => $redirects,
            'suggestions' => count($redirects) > 0 ? "Review the redirect chain." : "No redirects to handle."
        ]);

        return $values;
    }

    // Backlinks checker
    public function getBacklinks(Request $request)
    {
        $client = new Client();
        $client->setAuthConfig(storage_path('app/google/credentials.json'));  // Path to credentials.json
        $client->setScopes([Webmasters::WEBMASTERS_READONLY]);

        if ($request->session()->has('google_token')) {
            $client->setAccessToken($request->session()->get('google_token'));

            if ($client->isAccessTokenExpired()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
                $request->session()->put('google_token', $client->getAccessToken());
            }
        } else {
            if ($request->input('code')) {
                $token = $client->fetchAccessTokenWithAuthCode($request->input('code'));
                $request->session()->put('google_token', $token);
            } else {
                $authUrl = $client->createAuthUrl();
                return redirect($authUrl);
            }
        }

        $service = new Webmasters($client);

        try {
            $siteUrl = $request->input('url');
            $response = $service->links->listSites();

            $backlinks = [];

            // Extract backlink data
            foreach ($response->getLinks() as $link) {
                $backlinks[] = [
                    'referring_page' => $link['source'],
                    'target_page' => $link['target'],
                    'link_text' => $link['anchor'],
                ];
            }

            return response()->json(['backlinks' => $backlinks]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Words checker
    public function wordchecker(Request $request)
    {
        $url = $request->input('url');

        // Fetch the HTML content from the URL
        $response = Http::get($url);
        if (!$response->successful()) {
            return response()->json([
                'message' => 'Failed to retrieve the content from the URL.'
            ], 400);
        }

        $htmlContent = $response->body();
        $dom = new \DOMDocument();
        @$dom->loadHTML($htmlContent);

        // Extract title and meta description
        $title = '';
        $metaDescription = '';
        $metaTags = $dom->getElementsByTagName('meta');
        foreach ($metaTags as $meta) {
            if ($meta->getAttribute('name') == 'description') {
                $metaDescription = $meta->getAttribute('content');
            }
        }
        $titleTags = $dom->getElementsByTagName('title');
        if ($titleTags->length > 0) {
            $title = $titleTags->item(0)->nodeValue;
        }

        // Extract text content from the DOM and calculate total words
        $textContent = strip_tags($htmlContent);
        $wordsArray = preg_split('/\s+/', trim($textContent));
        $totalWordCount = count($wordsArray);

        // Define a list of stop words to exclude
        $stopWords = [
            'i',
            'me',
            'my',
            'myself',
            'we',
            'our',
            'ours',
            'ourselves',
            'you',
            'your',
            'yours',
            'yourself',
            'yourselves',
            'he',
            'him',
            'his',
            'himself',
            'she',
            'her',
            'hers',
            'herself',
            'it',
            'its',
            'itself',
            'they',
            'them',
            'their',
            'theirs',
            'themselves',
            'what',
            'which',
            'who',
            'whom',
            'this',
            'that',
            'these',
            'those',
            'am',
            'is',
            'are',
            'was',
            'were',
            'be',
            'been',
            'being',
            'have',
            'has',
            'had',
            'having',
            'do',
            'does',
            'did',
            'doing',
            'a',
            'p',
            'tr',
            'td',
            'table',
            'us',
            'an',
            'the',
            'and',
            'but',
            'if',
            'or',
            'because',
            'as',
            'until',
            'while',
            'of',
            'at',
            'by',
            'for',
            'with',
            'about',
            'against',
            'between',
            'into',
            'through',
            'during',
            'before',
            'after',
            'above',
            'below',
            'to',
            'from',
            'up',
            'down',
            'in',
            'out',
            'on',
            'off',
            'over',
            'under',
            'again',
            'further',
            'then',
            'once',
            'here',
            'there',
            'when',
            'where',
            'why',
            'how',
            'all',
            'any',
            'both',
            'each',
            'few',
            'more',
            'most',
            'other',
            'some',
            'such',
            'no',
            'nor',
            'not',
            'only',
            'own',
            'same',
            'so',
            'than',
            'too',
            'very',
            's',
            't',
            'can',
            'will',
            'just',
            'don',
            'should',
            'now',
            'ul',
            'li',
            '{',
            '},',
            '}',
            '+',
            '//',
            '});',
            'var',
            '=',
            'true,',
            '===',
            '/*',
            '*/',
            'translate(50%,',
            'content:',
            '&',
            'top:',
            'border-radius:',
            'background-color:',
            'transform:',
            '&amp;',
        ];

        // Example list of verbs (you can expand this list)
        $verbs = [
            'am',
            'are',
            'was',
            'were',
            'be',
            'been',
            'being',
            'have',
            'has',
            'had',
            'having',
            'do',
            'does',
            'did',
            'doing',
            'is',
            'are',
            'was',
            'were',
            'can',
            'will',
            'shall',
            'should'
        ];

        // Regular expression to remove CSS classes, HTML tags, and special characters
        $removePattern = '/<.*?>|[0-9]+|[^\w\s]+/';

        // Count word frequencies, excluding stop words, verbs, symbols, numbers, and HTML tags
        $wordFrequency = array_count_values(array_map('strtolower', array_filter($wordsArray, function ($word) use ($stopWords, $verbs, $removePattern) {
            // Remove HTML tags, numbers, and symbols
            $word = preg_replace($removePattern, '', $word);

            // Return false if the word is empty, a stop word, a verb, or contains invalid characters
            return !empty($word) && !in_array(strtolower($word), $stopWords) && !in_array(strtolower($word), $verbs);
        })));

        $results = [];

        // Analyze frequent words for their presence in title, meta description, and headings
        foreach ($wordFrequency as $keyword => $frequency) {
            // Check if keyword is in title, meta description, and headings
            $inTitle = stripos($title, $keyword) !== false;
            $inMetaDescription = stripos($metaDescription, $keyword) !== false;

            // Check if keyword appears in headings
            $headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            $inHeadings = false;
            foreach ($headings as $heading) {
                $headingTags = $dom->getElementsByTagName($heading);
                foreach ($headingTags as $tag) {
                    if (stripos($tag->nodeValue, $keyword) !== false) {
                        $inHeadings = true;
                        break 2; // Exit both loops
                    }
                }
            }

            // Include the keyword only if it appears in Title, Meta Description, and Headings
            if ($inTitle && $inMetaDescription && $inHeadings) {
                $results[] = [
                    'keyword' => $keyword,
                    'title' => '✓',
                    'meta_description' => '✓',
                    'headings' => '✓',
                    'frequency' => $frequency
                ];
            }
        }

        // Filter two-word phrases that appear in Title, Meta Description, and Headings
        $phraseResults = [];
        $phraseFrequency = [];

        // Select specific tags to scan for phrases
        $tagsToCheck = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        foreach ($tagsToCheck as $tag) {
            $elements = $dom->getElementsByTagName($tag);
            foreach ($elements as $element) {
                $tagContent = strip_tags($element->nodeValue); // Get the text content of the element
                $tagWords = preg_split('/\s+/', trim($tagContent)); // Split content into words

                // Generate two-word phrases from the words in the tag
                for ($i = 0; $i < count($tagWords) - 1; $i++) {
                    $phrase = strtolower($tagWords[$i] . ' ' . $tagWords[$i + 1]);

                    // Check if the phrase contains a comma or if it's a stop word
                    if (!in_array($phrase, $stopWords) && !preg_match('/^[.!]/', $phrase) && !preg_match('/,/', $phrase)) {
                        $phraseFrequency[$phrase] = ($phraseFrequency[$phrase] ?? 0) + 1;
                    }
                }
            }
        }

        foreach ($phraseFrequency as $phrase => $frequency) {
            $inTitle = stripos($title, $phrase) !== false;
            $inMetaDescription = stripos($metaDescription, $phrase) !== false;
            $inHeadings = false;

            foreach ($headings as $heading) {
                $headingTags = $dom->getElementsByTagName($heading);
                foreach ($headingTags as $tag) {
                    if (stripos($tag->nodeValue, $phrase) !== false) {
                        $inHeadings = true;
                        break 2; // Exit both loops
                    }
                }
            }

            // Include the phrase only if it appears in Title, Meta Description, and Headings
            if ($inTitle && $inMetaDescription && $inHeadings) {
                $phraseResults[] = [
                    'phrase' => $phrase,
                    'title' => '✓',
                    'meta_description' => '✓',
                    'headings' => '✓',
                    'frequency' => $frequency
                ];
            }
        }


        // Count the total keywords and phrases found
        $totalKeywords = count( $results);
        $totalPhrases = count( $phraseResults);

        // Define a minimum threshold for keywords and phrases
        $minKeywords = 3; // Adjust this number based on your requirement

        // Check if the total found keywords and phrases are below the threshold
        $error = ($totalKeywords < $minKeywords) || ($totalPhrases < $minKeywords);
        $errorMessage = $error ? "Not enough keywords or phrases found. Consider improving your content." : null;

        // Word count error
        $totalWordCounterror = $totalWordCount < 2100;

        // Return the results in JSON format
        return response()->json([
            "info" => "wordchecker",
            'frequent_keywords_count' => count( $results),
            'frequent_phrases_count' => count( $phraseResults),
            'frequent_keywords' => $results,
            'frequent_phrases' => $phraseResults,
            'total_word_count' => $totalWordCount,
            'totalWordCounterror' => $totalWordCounterror,
            'totalWordCountmessage' => $totalWordCounterror ? "For SEO, the ideal blog post length should be 2,100-2,400 words" : 'Articles 3,000 words or longer won the most backlinks',
            'errors' => $error,  
            'message' => $error ? $errorMessage : 'Your page main keywords are distributed well across the important HTML tags.'
        ]);
    }


    public function getOverallScore(Request $request)
    {
        $url = $request->input('url');

        // Validate the URL
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return response()->json([
                'error' => 'Invalid URL format.',
                'suggestions' => 'Please provide a valid URL.'
            ], 400);
        }

        // Initialize the results array
        $results = [];

        // Call each check method and store the results
        $results['meta_title'] = $this->checkMetaTags($request)->getData();
        $results['meta_description'] = $this->checkMetaTags($request)->getData();
        $results['heading_tags'] = $this->checkHeadings($request)->getData();
        $results['keyword_density'] = $this->wordchecker($request)->getData();
        $results['key_phrases'] = $this->wordchecker($request)->getData();
        $results['image_alt_attributes'] = $this->checkAltTags($request)->getData();
        $results['social_links_check'] = $this->checkSocialLinks($request)->getData();
        $results['favicon_check'] = $this->checkFavicon($request)->getData();
        $results['og_tags'] = $this->checkOgTags($request)->getData();

        // Calculate the overall score (example logic, you can adjust as needed)
        $totalChecks = count($results);
        $passedChecks = 0;

        foreach ($results as $result) {
            if (!$result->errors) {
                $passedChecks++;
            }
        }

        $overallScore = ($passedChecks / $totalChecks) * 100;

        // Return the aggregated results and overall score
        return response()->json([
            'overall_score' => $overallScore,
            'results' => $results,
            'message' => 'Overall SEO analysis completed successfully'
        ]);
    }

}