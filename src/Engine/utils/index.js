import Texture from "../Texture";

/**
 * Cached textures
 * @type {Object}
 */
export let TextureCache = {};

let hashIndex = -1;
let hashes = [];

/**
 * Parsed maps
 * @type {Object}
 */
export let Maps = {};

/**
 * Get a sprite
 * @param {String}   sprite
 * @param {Function} resolve
 */
export function getSprite(sprite, resolve) {

  if (TextureCache[sprite]) {
    resolve(TextureCache[sprite]);
    return void 0;
  }

  new Texture(sprite, function(instance) {
    resolve(TextureCache[sprite] = instance);
  });

  return void 0;

}

/**
 * Generate a unique hash
 * @export
 */
export function uHash() {

  let index = ++hashIndex;

  if (hashes.indexOf(index) > -1) return (this.uHash());

  hashes.push(index);

  return (index);

}

/**
 * @param {Object} cls
 * @param {Object} prot
 * @export
 */
export function inherit(cls, prot) {

  let key = null;

  for (key in prot) {
    if (prot[key] instanceof Function) {
      cls.prototype[key] = prot[key];
    }
  };

}

/**
 * @param {Number} width
 * @param {Number} height
 */
export function createCanvasBuffer(width, height) {

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  ctx.setImageSmoothing(false);

  canvas.width = width;
  canvas.height = height;

  return (ctx);

}

/**
 * @param {Object} img
 * @return {Object}
 */
export function imageToCanvas(img) {

  let ctx = createCanvasBuffer(
    img.width, img.height
  );

  ctx.drawImage(
    img,
    0, 0,
    img.width, img.height
  );

  return (ctx);

}

/**
 * Get current time
 * @return {Object}
 */
export function getTime() {

  let date = new Date();

  return ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

}

/**
 * Ajax
 * @param {String} url
 */
export function ajax(url) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error("Network error"));
    };
    req.send();
  });
}