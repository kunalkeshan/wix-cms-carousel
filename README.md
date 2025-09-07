# Wix CMS Carousel

A high-performance, responsive video testimonials carousel with server-side hydration, lazy loading, and infinite pagination. Built with Next.js 14, TanStack Query, and Wix CMS integration.

Setup a custom styled carousel on an external website that fetches data from Wix CMS API and map it to carousel items. Then, embed the carousel in your Wix website using an HTML embed code inside an iframe element.

## Embedding Site as an Iframe

To embed a site as an iframe into the Wix editor, follow these steps:

1. **Go to Elements:** In the Wix editor, navigate to the "Add Elements" panel.
2. **Select "Embed Code":** Scroll down and click on the "Embed Code" option.
3. **Select "Embed a Site":** Choose the "Embed a Site" option from the "Embed Code" menu.
4. **Paste the Site URL:** In the "HTML Settings" pop-up, select "Website address" and enter the URL of the site you want to embed.

After embedding the site, adjust the width and height of the embed to fit your page requirements.

![Steps to Embed Site Into Wix](https://github.com/kunalkeshan/wix-cms-carousel/assets/68579547/508727bb-cfbf-4f51-ae08-8c96b0344461)

## Using URL Search Query for Filtering Videos

1. Make sure the key in the wix collection for the tags field matches to that of the query params. I'm using `tags`, but the saved field was stored as `arraystring` by Wix. (Map it out correctly)
2. Update the types for the tags as per requirement.
3. Just add `/?tags=<tag1>,<tag2>` and so on, and it will filter it out.
4. Filtering logic is as follows
    - No `tags` or empty `tags` query will return all the testimonial videos.
    - Filtering will compare with tags passed in the query to the tags in the video object, will return all those that matches.
    - Ordering of tag is independing of the order of the videos, meaning `/?tags=<tag1>,<tag2>` or `/?tags=<tag2>,<tag1>` will return the same results.

## API Endpoints

### GET `/api/testimonials`
Paginated testimonials endpoint with filtering support.

**Parameters:**
- `limit` (optional): Number of testimonials per page (default: 20)
- `offset` (optional): Starting position for pagination (default: 0)
- `tags` (optional): Comma-separated list of tags for filtering

**Response:**
```json
{
  "testimonials": [/* testimonial objects */],
  "hasMore": boolean,
  "total": number
}
```

## Performance Features

### Video Lazy Loading
Videos use intersection observer to load metadata only when coming into viewport:
- Off-screen videos: `preload="none"` (minimal bandwidth usage)
- Visible videos: `preload="metadata"` (thumbnails preserved)
- Smooth transitions with loading states

### Server-Side Hydration
- Initial testimonials prefetched on server using TanStack Query
- Instant page loads with hydrated data
- Seamless client-side interactions

### Infinite Pagination
- Load testimonials in chunks (20 per page)
- RESTful API with `limit` and `offset` parameters
- Automatic loading states and error handling

## CORS Configuration

For iframe embedding, the API is configured to allow requests from:
- `https://www.junglithenomad.com`
- `https://junglithenomad.com`  
- `https://wix.com` and all `*.wix.com` subdomains
- Local development environment

## Environment Variables

```env
WIX_API_KEY="your-wix-api-key"
WIX_SITE_ID="your-wix-site-id" 
WIX_COLLECTION_ID="your-collection-id"
VERCEL_PROJECT_PRODUCTION_URL="auto-configured-in-production"
ALLOWED_ORIGINS="https://www.junglithenomad.com,https://junglithenomad.com,https://wix.com,https://*.wix.com"
```

## References

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Create a Client with an API Key](https://dev.wix.com/docs/go-headless/coding/java-script-sdk/admin/create-a-client-with-an-api-key)
- [Generate an API Key](https://dev.wix.com/docs/go-headless/getting-started/setup/authentication/generate-an-api-key-for-admins)
- [Getting Media URLs](https://dev.wix.com/docs/sdk/articles/working-with-the-sdk/work-with-wix-media)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Nuqs for Search Query Access](https://nuqs.47ng.com/docs/)
