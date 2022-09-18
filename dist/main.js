/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_postImage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/postImage.js */ \"./src/modules/postImage.js\");\n/* harmony import */ var _modules_postResource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/postResource.js */ \"./src/modules/postResource.js\");\n/* harmony import */ var _modules_likePost_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/likePost.js */ \"./src/modules/likePost.js\");\n/* harmony import */ var _modules_convertMarkdown_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/convertMarkdown.js */ \"./src/modules/convertMarkdown.js\");\n// Import Third Party Packages\r\n// import Notiflix from \"notiflix\";\r\n\r\n// Import Custom Modules\r\n\r\n\r\n\r\n\r\n\r\n// Run Modules on specific Sites\r\nwindow.addEventListener(\"DOMContentLoaded\", (event) => {\r\n  // Post Image Script\r\n  if (top.location.pathname.toString() === \"/post-image/\") {\r\n    (0,_modules_postImage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n  }\r\n\r\n  // Edit Image Script\r\n  // ...\r\n\r\n  // Edit Profile Script\r\n  // ...\r\n\r\n  // Post Resource Script\r\n  if (top.location.pathname.toString() === \"/post-resource/\") {\r\n    (0,_modules_postResource_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n  }\r\n\r\n  // Like Post Logic\r\n  (0,_modules_likePost_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n\r\n  // Convert Markdown to html\r\n  (0,_modules_convertMarkdown_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\r\n});\r\n\r\n// Define Settings\r\n\r\nasync function notiflixSetting() {\r\n  const { Notiflix } = await __webpack_require__.e(/*! import() | notiflix */ \"notiflix\").then(__webpack_require__.t.bind(__webpack_require__, /*! notiflix */ \"./node_modules/notiflix/dist/notiflix-aio-3.2.5.min.js\", 23));\r\n  Notiflix.Notify.init({\r\n    distance: \"20px\",\r\n    zindex: 999999,\r\n    fontFamily: \"Inter\",\r\n    useGoogleFont: false,\r\n    borderRadius: \"10px\",\r\n    useFontAwesome: false,\r\n  });\r\n}\r\n\r\nnotiflixSetting();\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/convertMarkdown.js":
/*!****************************************!*\
  !*** ./src/modules/convertMarkdown.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nasync function convertMarkdown() {\r\n  const { marked } = await __webpack_require__.e(/*! import() | marked */ \"marked\").then(__webpack_require__.bind(__webpack_require__, /*! marked */ \"./node_modules/marked/lib/marked.esm.js\"));\r\n  const { default: DOMPurify } = await __webpack_require__.e(/*! import() | dompurify */ \"dompurify\").then(__webpack_require__.t.bind(__webpack_require__, /*! dompurify */ \"./node_modules/dompurify/dist/purify.js\", 23));\r\n\r\n  console.log(\"marked\", marked);\r\n  console.log(\"DOMPurify\", DOMPurify);\r\n\r\n  const markdowns = document.querySelectorAll(\".bb_markdown_content span\");\r\n  if (!markdowns) {\r\n    return;\r\n  }\r\n  markdowns.forEach((markdown) => {\r\n    const html = marked(markdown.textContent);\r\n    markdown.innerHTML = DOMPurify.sanitize(html);\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertMarkdown);\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/modules/convertMarkdown.js?");

/***/ }),

/***/ "./src/modules/likePost.js":
/*!*********************************!*\
  !*** ./src/modules/likePost.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nasync function likePost() {\r\n  const bbLikeButton = document.querySelector(\"#bbLikeButton\");\r\n  const bbLikeCounter = document.querySelector(\"#bbLikeCounter\");\r\n  const bbLikeCounterWrapper = document.querySelector(\"#bbLikeCounterWrapper\");\r\n\r\n  // Check there is a like button\r\n  if (!bbLikeButton || !bbLikeCounter || !bbLikeCounterWrapper) {\r\n    return;\r\n  }\r\n\r\n  // Check there is a user nonce\r\n  if (!wp_api_settings.nonce) {\r\n    return;\r\n  }\r\n\r\n  // Check User has liked this Post and Set liked class\r\n  const url = wp_api_settings.root + \"promptbeauty/v1/like/\";\r\n  const request = {\r\n    method: \"GET\",\r\n    headers: {\r\n      \"X-WP-Nonce\": wp_api_settings.nonce,\r\n    },\r\n  };\r\n  const response = await fetch(url, request);\r\n  const data = await response.json();\r\n  if (data.userHasLiked) {\r\n    bbLikeCounterWrapper.classList.add(\"bb-is-liked\");\r\n  }\r\n\r\n  // Add Event Listener to Like Button\r\n  bbLikeButton.addEventListener(\"click\", async (event) => {\r\n    const { Notiflix } = await __webpack_require__.e(/*! import() | notiflix */ \"notiflix\").then(__webpack_require__.t.bind(__webpack_require__, /*! notiflix */ \"./node_modules/notiflix/dist/notiflix-aio-3.2.5.min.js\", 23));\r\n\r\n    const url = wp_api_settings.root + \"promptbeauty/v1/like/\";\r\n    const request = {\r\n      method: \"POST\",\r\n      headers: {\r\n        \"X-WP-Nonce\": wp_api_settings.nonce,\r\n      },\r\n    };\r\n    const response = await fetch(url, request);\r\n    const data = await response.json();\r\n\r\n    if (data.status === \"error\") {\r\n      Notiflix.Notify.failure(data.message);\r\n    }\r\n\r\n    if (data.status === \"success\") {\r\n      if (data.action === \"liked\") {\r\n        bbLikeCounterWrapper.classList.add(\"bb-is-liked\");\r\n      } else if (data.action === \"unliked\") {\r\n        bbLikeCounterWrapper.classList.remove(\"bb-is-liked\");\r\n      }\r\n      bbLikeCounter.textContent = data.new_like_count;\r\n      return;\r\n    }\r\n\r\n    Notiflix.Notify.failure(\"Something is Rotten in the State of Denmark\");\r\n  });\r\n}\r\nlikePost();\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (likePost);\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/modules/likePost.js?");

/***/ }),

/***/ "./src/modules/postImage.js":
/*!**********************************!*\
  !*** ./src/modules/postImage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_readFileAsync_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/readFileAsync.js */ \"./src/modules/utils/readFileAsync.js\");\n// import Notiflix from \"notiflix\";\r\n// import validator from \"validator\";\r\n//import filetypeinfo from \"magic-bytes.js\";\r\n\r\n\r\nasync function postImage() {\r\n  const image = document.querySelector(\"#bb_image\");\r\n  const imageError = document.querySelector(\"#bb_error_image\");\r\n  const preview = document.querySelector(\"#bb_preview_image\");\r\n  const title = document.querySelector(\"#bb_title\");\r\n  const titleError = document.querySelector(\"#bb_error_title\");\r\n  const titleIsPrompt = document.querySelector(\"#bb_title_is_prompt\");\r\n  const titleIsPromptError = document.querySelector(\"#bb_error_title_is_prompt\");\r\n  const model = document.querySelector(\"#bb_model\");\r\n  const modelError = document.querySelector(\"#bb_error_model\");\r\n  const description = document.querySelector(\"#bb_description\");\r\n  const descriptionError = document.querySelector(\"#bb_error_description\");\r\n  const submit = document.querySelector(\"#bb_submit\");\r\n\r\n  // Validate Image Input and if okay render Preview\r\n  image.addEventListener(\"change\", async (event) => {\r\n    const file = event.target.files[0];\r\n\r\n    function cleanPreview() {\r\n      preview.src = \"\";\r\n      preview.style.display = \"none\";\r\n    }\r\n\r\n    let error = false;\r\n\r\n    // Check File exists\r\n    if (!file) {\r\n      cleanPreview();\r\n      error = \"Please, select an image.\";\r\n      console.log(error);\r\n    }\r\n\r\n    // Check File is an Image\r\n    if (file && !error) {\r\n      const { filetypeinfo } = await __webpack_require__.e(/*! import() | magic-bytes.js */ \"magic-bytes.js\").then(__webpack_require__.t.bind(__webpack_require__, /*! magic-bytes.js */ \"./node_modules/magic-bytes.js/dist/index.js\", 23));\r\n      const fileReader = new FileReader();\r\n      const buffer = await (0,_utils_readFileAsync_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(event.target.files[0]);\r\n      const bytes = new Uint8Array(buffer);\r\n      const type = filetypeinfo(bytes);\r\n      const isImage = type[0].typename === \"jpg\" || type[0].typename === \"png\";\r\n      if (!isImage) {\r\n        cleanPreview();\r\n        error = \"Your File has to be an Image in PNG or JPG Format.\";\r\n        console.log(error);\r\n      }\r\n    }\r\n\r\n    // Check File is less than 5MB\r\n    if (file && file.size > 5242880 && !error) {\r\n      cleanPreview();\r\n      image.value = null;\r\n      error = \"Your File has to be less than 5mb.\";\r\n      console.log(error);\r\n    }\r\n\r\n    if (error) {\r\n      imageError.textContent = error;\r\n      return;\r\n    }\r\n    {\r\n      imageError.textContent = \"\";\r\n    }\r\n\r\n    // Render Preview\r\n    preview.src = URL.createObjectURL(file);\r\n    preview.style.display = \"block\";\r\n  });\r\n\r\n  submit.addEventListener(\"click\", uploadImage);\r\n\r\n  title.addEventListener(\"change\", async (event) => {\r\n    const { validator } = await __webpack_require__.e(/*! import() | validator */ \"validator\").then(__webpack_require__.t.bind(__webpack_require__, /*! validator */ \"./node_modules/validator/index.js\", 23));\r\n    const value = event.target.value;\r\n    if (validator.isEmpty(value)) {\r\n      titleError.textContent = \"Please enter a title.\";\r\n    } else {\r\n      titleError.textContent = \"\";\r\n    }\r\n  });\r\n\r\n  model.addEventListener(\"change\", (event) => {\r\n    const value = event.target.value;\r\n    if (value === \"none\") {\r\n      modelError.textContent = \"Please enter a model.\";\r\n    } else {\r\n      modelError.textContent = \"\";\r\n    }\r\n  });\r\n\r\n  description.addEventListener(\"change\", async (event) => {\r\n    const { validator } = await __webpack_require__.e(/*! import() | validator */ \"validator\").then(__webpack_require__.t.bind(__webpack_require__, /*! validator */ \"./node_modules/validator/index.js\", 23));\r\n    const value = event.target.value;\r\n    if (!validator.isLength(value, { min: 0, max: 1000 })) {\r\n      descriptionError.textContent = \"Your description has to be less than 1000 characters.\";\r\n    } else {\r\n      descriptionError.textContent = \"\";\r\n    }\r\n  });\r\n\r\n  // Upload Image to Wordpress\r\n  async function uploadImage() {\r\n    const { Notiflix } = await __webpack_require__.e(/*! import() | notiflix */ \"notiflix\").then(__webpack_require__.t.bind(__webpack_require__, /*! notiflix */ \"./node_modules/notiflix/dist/notiflix-aio-3.2.5.min.js\", 23));\r\n\r\n    // Bad Idea to validate like this...\r\n    const errorElements = document.querySelectorAll(\"[id^='bb_error']\");\r\n\r\n    for (let i = 0; i < errorElements.length; i++) {\r\n      const { validator } = await __webpack_require__.e(/*! import() | validator */ \"validator\").then(__webpack_require__.t.bind(__webpack_require__, /*! validator */ \"./node_modules/validator/index.js\", 23));\r\n      if (!validator.isEmpty(errorElements[i].textContent)) {\r\n        console.log(errorElements[i]);\r\n        console.log(errorElements[i].textContent);\r\n        console.log(errorElements[i].textContent.length);\r\n        Notiflix.Notify.failure(errorElements[i].textContent);\r\n        return;\r\n      }\r\n    }\r\n\r\n    const formData = new FormData();\r\n    formData.append(\"file\", image.files[0]);\r\n    formData.append(\"status\", \"publish\");\r\n    formData.append(\"title\", title.value);\r\n\r\n    const url = wp_api_settings.root + \"wp/v2/media\";\r\n    const request = {\r\n      method: \"POST\",\r\n      headers: {\r\n        \"Content-Disposition\": \"attachment\",\r\n        \"X-WP-Nonce\": wp_api_settings.nonce,\r\n      },\r\n      body: formData,\r\n    };\r\n    const response = await fetch(url, request);\r\n    const data = await response.json();\r\n    if (data.id) {\r\n      sendData(data.id);\r\n    } else {\r\n      console.log(\"error\", data);\r\n      Notiflix.Notify.failure(\"Something is rotten in the state of Denmark\");\r\n    }\r\n  }\r\n\r\n  // Send Data to Wordpress with Image Id from previous functions\r\n  async function sendData(imageId) {\r\n    const url = wp_api_settings.root + \"wp/v2/images/\";\r\n    const formData = {\r\n      // Formdata\r\n      title: title.value,\r\n      featured_media: imageId,\r\n      acf: {\r\n        title_is_prompt: titleIsPrompt.checked,\r\n        model: model.value,\r\n        description: description.value,\r\n      },\r\n      // General\r\n      status: \"publish\",\r\n    };\r\n\r\n    const request = {\r\n      method: \"POST\",\r\n      mode: \"cors\",\r\n      cache: \"no-cache\",\r\n      credentials: \"same-origin\",\r\n      headers: {\r\n        \"Content-Type\": \"application/json\",\r\n        \"X-WP-Nonce\": wp_api_settings.nonce,\r\n      },\r\n      redirect: \"follow\",\r\n      referrerPolicy: \"no-referrer\",\r\n      body: JSON.stringify(formData),\r\n    };\r\n    const response = await fetch(url, request);\r\n    const data = await response.json();\r\n\r\n    if (data.link) {\r\n      window.location.href = data.link;\r\n    } else {\r\n      console.log(\"Error\", data);\r\n      Notiflix.Notify.failure(\"Something is rotten in the state of Denmark\");\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postImage);\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/modules/postImage.js?");

/***/ }),

/***/ "./src/modules/postResource.js":
/*!*************************************!*\
  !*** ./src/modules/postResource.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import EasyMDE from \"easymde\";\r\n// Embedded via unpkg only on post reource site. already loaded.\r\n\r\nasync function postResource() {\r\n  const easyMDE = new EasyMDE({\r\n    element: document.getElementById(\"bb_easymde_editor\"),\r\n    showIcons: [\r\n      \"strikethrough\",\r\n      \"code\",\r\n      \"table\",\r\n      \"redo\",\r\n      \"heading\",\r\n      \"undo\",\r\n      \"heading-bigger\",\r\n      \"heading-smaller\",\r\n      \"heading-1\",\r\n      \"heading-2\",\r\n      \"heading-3\",\r\n      \"clean-block\",\r\n      \"horizontal-rule\",\r\n    ],\r\n    autosave: {\r\n      enabled: true,\r\n      delay: 1000,\r\n      uniqueId: \"mde-autosave-demo\",\r\n    },\r\n    initialValue:\r\n      \"# EasyMDE \\nGo ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`.\",\r\n  });\r\n  console.log(\"easyMDE\", easyMDE);\r\n  console.log(\"easyMDE.value()\", easyMDE.value());\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postResource);\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/modules/postResource.js?");

/***/ }),

/***/ "./src/modules/utils/readFileAsync.js":
/*!********************************************!*\
  !*** ./src/modules/utils/readFileAsync.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction readFileAsync(file) {\r\n  return new Promise((resolve, reject) => {\r\n    let reader = new FileReader();\r\n\r\n    reader.onload = () => {\r\n      resolve(reader.result);\r\n    };\r\n\r\n    reader.onerror = reject;\r\n\r\n    reader.readAsArrayBuffer(file);\r\n  });\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (readFileAsync);\r\n\n\n//# sourceURL=webpack://prompt-beauty-app/./src/modules/utils/readFileAsync.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "prompt-beauty-app:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkprompt_beauty_app"] = self["webpackChunkprompt_beauty_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;