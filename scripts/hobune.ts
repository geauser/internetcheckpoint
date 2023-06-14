import fs from 'node:fs';
import download from 'download';
import { execSync } from 'node:child_process';
import { JSDOM } from 'jsdom';

const cwd = process.cwd();

if (cwd.split('/').pop() !== 'internetcheckpoint') {
  console.log('[ERROR] Please run this script from the root of the project');
  process.exit(1);
}

const metadataFilePath = `${cwd}/backups/_metadata.json`;


/**
 * Download all the thumbnails from hobune.stream into
 * packages/website/public/images/thumbnails.
 */
async function downloadThumbnails() {
  const thumbnailsFolderPath = `${cwd}/packages/website/public/images/thumbnails`;

  if (fs.existsSync(thumbnailsFolderPath)) fs.rmdirSync(thumbnailsFolderPath);
  fs.mkdirSync(thumbnailsFolderPath);

  const metadata = await import(metadataFilePath).catch(err => {}) ?? {};

  for (const id in metadata.default) {

    const res = await fetch(`https://hobune.stream/videos/${id}`);
    const html = await res.text();
    const { window: { document } } = new JSDOM(html);
    const button = document.querySelectorAll('.button.download')[2];

    const url = encodeURI(`https://hobune.stream${button.parentElement?.getAttribute('href')}`);
    const extension = url.substring(url.lastIndexOf('.') + 1);

    execSync(`curl "${url}" --output ${thumbnailsFolderPath}/${id}.${extension}`);
  }

}

/**
 * Download all the videos from hobune.stream.
 * NOTE: This script is not meant to be run again.
 */
async function downloadVideos() {
  const videosFolderPath = `${cwd}/packages/website/public/videos`;
  if (!fs.existsSync(videosFolderPath)) fs.mkdirSync(videosFolderPath);
  const metadata = await import(metadataFilePath).catch(err => {}) ?? {};


  for (const videoId in metadata.default) {

    const res = await fetch(`https://hobune.stream/videos/${videoId}`);
    const html = await res.text();
    const { window: { document } } = new JSDOM(html);
    const button = document.querySelectorAll('.button.download')[0];
    const url = encodeURI(`https://hobune.stream${button.parentElement?.getAttribute('href')}`);

    console.log(`Downloading video "${videoId}.mp4"...`);
    await download(url, videosFolderPath, { filename: `${videoId}.mp4` });

  }

}

/**
 * Used to fill _metadata.json with all the videos from hobune.stream.
 * Data missing from hobune website were filled manually using the Wayback machine.
 * NOTE: This script is not meant to be run again.
 */
async function listAllVideos() {

  const res = await fetch('https://hobune.stream/channels/UCkVo7eqym1ZX2A9-GabEXrw');
  const html = await res.text();
  const { window: { document } } = new JSDOM(html);
  const ids = Array.from(document.querySelectorAll('.card > a')).map(a => a?.getAttribute('href')?.split('/').pop());

  const metadata = await import(metadataFilePath).catch(err => {}) ?? {};

  ids.forEach(id => {

    const title = document.querySelector(`a[href='/videos/${id}'] .title`)?.textContent?.trim();
    const publishedAt = document.querySelector(`a[href='/videos/${id}'] .content > p`)?.textContent?.split(',').pop()?.trim();

    if (metadata[id!]) {
      console.warn(`\n[WARNING] Video "${id}" already exists in metadata file\noverwriting it will force you to get the like/dislike/view count again from the wayback machine!`);
      return;
    }

    metadata[id!] = {
      title,
      viewCount:    null,
      likeCount:    null,
      dislikeCount: null,
      publishedAt,
    };

  });

  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));

}

/**
 * Used to open all the videos from hobune.stream in the Wayback machine.
 * NOTE: This script is not meant to be run again.
 */
async function openVideoLinksInWaybackMachine() {

  const metadata = await import(metadataFilePath).catch(err => {}) ?? {};

  for (const id in metadata) {
    execSync(`open https://web.archive.org/web/*/https://youtube.com/watch?v=${id}`);
  }

}
