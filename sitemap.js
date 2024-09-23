const express = require('express')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

const app = express()
let sitemap

const routes = [
    { path: '/' },
    { path: '/convert-image' },
    { path: '/convert-image-to-webp' },
    { path: '/qrcode-generator' },
]

app.get('/sitemap.xml', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://bearune.com/' })
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    smStream.write({ url: '/page-1/',  changefreq: 'daily', priority: 0.3 })
    smStream.write({ url: '/page-2/',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/page-3/'})    // changefreq: 'weekly',  priority: 0.5
    smStream.write({ url: '/page-4/',   img: "http://urlTest.com" })
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

app.listen(3000, () => {
  console.log('listening')
});