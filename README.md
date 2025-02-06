# Wix CMS Carousel

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

## References

- [Create a Client with an API Key](https://dev.wix.com/docs/go-headless/coding/java-script-sdk/admin/create-a-client-with-an-api-key)
- [Generate an API Key](https://dev.wix.com/docs/go-headless/getting-started/setup/authentication/generate-an-api-key-for-admins)
- [Getting Media URLs](https://dev.wix.com/docs/sdk/articles/working-with-the-sdk/work-with-wix-media)
- [aggregateDataItems( ) - fetching CMS Data Items from a collection](https://dev.wix.com/docs/sdk/backend-modules/data/items/aggregate-data-items)
- [Preload Video Poster from video frame at custom timeframe](https://stackoverflow.com/questions/7323053/dynamically-using-the-first-frame-as-poster-in-html5-video)
- [Nuqs for Search Query Access](https://nuqs.47ng.com/docs/)
