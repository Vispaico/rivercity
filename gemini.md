
Render blocking requests Est savings of 1,800 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCP
URL
Transfer Size
Duration
rivercitybikerentals.com 1st party
11.1 KiB	330 ms
/assets/index-1da4abc4.css(www.rivercitybikerentals.com)
11.1 KiB
330 ms
Unpkg cdn 
4.2 KiB	780 ms
…dist/leaflet.css(unpkg.com)
4.2 KiB
780 ms
Google Fonts cdn 
1.6 KiB	780 ms
/css2?family=…(fonts.googleapis.com)
1.6 KiB
780 ms
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.
Top function call
Total reflow time
/assets/index-86e19d7e.js:26:1836(www.rivercitybikerentals.com)
31 ms
Source
Total reflow time
/assets/index-86e19d7e.js:75:4802(www.rivercitybikerentals.com)
31 ms
/assets/index-86e19d7e.js:67:48163(www.rivercitybikerentals.com)
0 ms
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCP
Maximum critical path latency: 697 ms
Initial Navigation
https://www.rivercitybikerentals.com - 131 ms, 2.82 KiB
/css2?family=…(fonts.googleapis.com) - 138 ms, 1.64 KiB
…v30/JTUSjIg1_….woff2(fonts.gstatic.com) - 697 ms, 35.43 KiB
…v23/pxiEyp8kv….woff2(fonts.gstatic.com) - 696 ms, 8.51 KiB
…v23/pxiByp8kv….woff2(fonts.gstatic.com) - 697 ms, 8.35 KiB
…v23/pxiByp8kv….woff2(fonts.gstatic.com) - 697 ms, 8.60 KiB
…v23/pxiByp8kv….woff2(fonts.gstatic.com) - 696 ms, 8.46 KiB
…dist/leaflet.css(unpkg.com) - 204 ms, 4.24 KiB
/assets/index-86e19d7e.js(www.rivercitybikerentals.com) - 528 ms, 244.06 KiB
/assets/index-1da4abc4.css(www.rivercitybikerentals.com) - 293 ms, 11.12 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
no origins were preconnected
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
No additional origins are good candidates for preconnecting
Improve image delivery Est savings of 389 KiB
Reducing the download time of images can improve the perceived load time of the page and LCP. Learn more about optimizing image sizeLCPFCP
URL
Resource Size
Est Savings
rivercitybikerentals.com 1st party
330.2 KiB	285.6 KiB
/rivercity_logo.png(www.rivercitybikerentals.com)
96.6 KiB
95.7 KiB
This image file is larger than it needs to be (800x799) for its displayed dimensions (80x80). Use responsive images to reduce the image download size.
95.7 KiB
/nvx1.webp(www.rivercitybikerentals.com)
105.9 KiB
88.8 KiB
Increasing the image compression factor could improve this image's download size.
9.8 KiB
This image file is larger than it needs to be (1000x591) for its displayed dimensions (380x277). Use responsive images to reduce the image download size.
87.1 KiB
/airblade.webp(www.rivercitybikerentals.com)
93.7 KiB
79.2 KiB
Increasing the image compression factor could improve this image's download size.
6.2 KiB
This image file is larger than it needs to be (955x563) for its displayed dimensions (398x224). Use responsive images to reduce the image download size.
78.2 KiB
/wave01.webp(www.rivercitybikerentals.com)
34.0 KiB
21.9 KiB
This image file is larger than it needs to be (720x424) for its displayed dimensions (380x285). Use responsive images to reduce the image download size.
21.9 KiB
unsplash.com
733.3 KiB	103.3 KiB
/photo-169…-65e6b5467523(images.unsplash.com)
605.8 KiB
72.0 KiB
Using a modern image format (WebP, AVIF) or increasing the image compression could improve this image's download size.
72.0 KiB
/photo-161…?q=…(images.unsplash.com)
127.6 KiB
31.3 KiB
Increasing the image compression factor could improve this image's download size.
31.3 KiB
LCP breakdown
Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCP
Subpart
Duration
Time to first byte
0 ms
Element render delay
3,340 ms
Premium motorbike and car rentals for your adventure in Vietnam's port city. Di…
<p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" style="opacity: 1; transform: none;">
3rd parties
3rd party code can significantly impact load performance. Reduce and defer loading of 3rd party code to prioritize your page's content.
3rd party
Transfer size
Main thread time
Google Fonts cdn 
71 KiB	0 ms
…v30/JTUSjIg1_….woff2(fonts.gstatic.com)
35 KiB
0 ms
…v23/pxiByp8kv….woff2(fonts.gstatic.com)
9 KiB
0 ms
…v23/pxiEyp8kv….woff2(fonts.gstatic.com)
9 KiB
0 ms
…v23/pxiByp8kv….woff2(fonts.gstatic.com)
8 KiB
0 ms
…v23/pxiByp8kv….woff2(fonts.gstatic.com)
8 KiB
0 ms
/css2?family=…(fonts.googleapis.com)
2 KiB
0 ms
Unpkg cdn 
4 KiB	0 ms
…dist/leaflet.css(unpkg.com)
4 KiB
0 ms
unsplash.com
734 KiB	0 ms
/photo-169…-65e6b5467523(images.unsplash.com)
606 KiB
0 ms
/photo-161…?q=…(images.unsplash.com)
128 KiB
0 ms
These insights are also available in the Chrome DevTools Performance Panel - record a trace to view more detailed information.
Diagnostics
Reduce unused JavaScript Est savings of 135 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.LCPFCP
URL
Transfer Size
Est Savings
rivercitybikerentals.com 1st party
243.4 KiB	135.1 KiB
/assets/index-86e19d7e.js(www.rivercitybikerentals.com)
243.4 KiB
135.1 KiB
Avoid serving legacy JavaScript to modern browsers Est savings of 12 KiB
Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support legacy browsers. Learn why most sites can deploy ES6+ code without transpilingLCPFCP
URL
Est Savings
rivercitybikerentals.com 1st party
11.5 KiB
/assets/index-86e19d7e.js(www.rivercitybikerentals.com)
11.5 KiB
/assets/index-86e19d7e.js:95:3079(www.rivercitybikerentals.com)
@babel/plugin-transform-classes
/assets/index-86e19d7e.js:120:18029(www.rivercitybikerentals.com)
Array.prototype.find
/assets/index-86e19d7e.js:120:17802(www.rivercitybikerentals.com)
String.prototype.endsWith
/assets/index-86e19d7e.js:120:17688(www.rivercitybikerentals.com)
String.prototype.startsWith

Names and labels
Buttons do not have an accessible name
When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. Learn how to make buttons more accessible.
Failing Elements
div.container > div.flex > div.md:hidden > button.inline-flex
<button class="inline-flex items-center justify-center rounded-md text-sm font-medium rin…">
div.grid > div > form.flex > button.inline-flex
<button class="inline-flex items-center justify-center rounded-md text-sm font-medium rin…" type="submit">
Links do not have a discernible name
Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. Learn how to make links accessible.
Failing Elements
div.grid > div > div.flex > a.bg-gray-800
<a href="#" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full">
div.grid > div > div.flex > a.bg-gray-800
<a href="#" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full">
div.grid > div > div.flex > a.bg-gray-800
<a href="#" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full">
div.grid > div > div.flex > a.bg-gray-800
<a href="#" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full">
div.grid > div > div.flex > a.bg-gray-800
<a href="#" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-blue-600 transition-colors p-2 rounded-full">
These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.
Contrast
Background and foreground colors do not have a sufficient contrast ratio.
Low-contrast text is difficult or impossible for many users to read. Learn how to provide sufficient color contrast.
Failing Elements
Cars
<button type="button" role="tab" aria-selected="false" aria-controls="radix-:r0:-content-motorcycles" data-state="inactive" id="radix-:r0:-trigger-motorcycles" class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 …" tabindex="-1" data-orientation="horizontal" data-radix-collection-item="">
Motorbikes Cars
<div role="tablist" aria-orientation="horizontal" class="inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-for…" tabindex="0" data-orientation="horizontal" style="outline: none;">
© 2025 RiverCity Bike Rentals. All rights reserved.
<p class="text-gray-500 text-sm mb-4 md:mb-0">
RiverCity Bike Rentals Premium vehicle rental service in Haiphong, Vietnam. Ex…
<footer class="bg-gray-900 text-white pt-16 pb-8">
Privacy Policy
<a class="text-gray-500 hover:text-blue-400 text-sm" href="/privacy-policy">
RiverCity Bike Rentals Premium vehicle rental service in Haiphong, Vietnam. Ex…
<footer class="bg-gray-900 text-white pt-16 pb-8">
Terms of Use
<a class="text-gray-500 hover:text-blue-400 text-sm" href="/terms-of-use">
RiverCity Bike Rentals Premium vehicle rental service in Haiphong, Vietnam. Ex…
<footer class="bg-gray-900 text-white pt-16 pb-8">
Cookie Policy
<a class="text-gray-500 hover:text-blue-400 text-sm" href="/cookies">
RiverCity Bike Rentals Premium vehicle rental service in Haiphong, Vietnam. Ex…
<footer class="bg-gray-900 text-white pt-16 pb-8">
These are opportunities to improve the legibility of your content.
Tables and lists
List items (<li>) are not contained within <ul>, <ol> or <menu> parent elements.
Screen readers require list items (<li>) to be contained within a parent <ul>, <ol> or <menu> to be announced properly. Learn more about proper list structure.
Failing Elements
Privacy Policy
<li class="list-none">
Terms of Use
<li class="list-none">
Cookie Policy
<li class="list-none">
These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.
Navigation
Heading elements are not in a sequentially-descending order
Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. Learn more about heading order.
Failing Elements
Sarah Johnson
<h4 class="font-bold text-gray-800">

Crawling and Indexing
robots.txt is not valid 1 error found
If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. Learn more about robots.txt.
Line #
Content
Error
4
Sitemap: /sitemap.xml
Invalid sitemap URL