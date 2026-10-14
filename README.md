# CSFD Extended

## Get started
1. Install Tampermonkey extension for your browser:
    - [Tampermonkey for Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
    - [Tampermonkey for Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

## How to develop?

1. Clone this repository.
2. Run `npm i` in the folder to install dependencies.
3. Run `npx webpack -w --mode="development"` in the folder to compile final JS.
4. Allow Tampermonkey extension to access local files.
    - Visit Chrome extension settings page at: chrome://extensions/
    - Find Tampermonkey, click to `Details`
    - Turn `Allow access to file URLs` checkbox on
5. Create new Tampermonkey script for dev purposes (load JS file from localhost).
   Disable original one.

    - **❗  Replace your own `// @require` filepath according to your cloned folder.**
    - Example filepath: `file:///C:/dev/csfd-extended/dist/csfd-extended.js`
    - Final Tampermonkey dev script template:

    ```
    // ==UserScript==
    // @name         [DEV] CSFD Extended
    // @description  DEVELOPER VERSION.
    // @include      *csfd.cz/film/*
    // @require      <------REPLACE-ME-WITH-YOUR-FILEPATH------>
    // @grant        GM_setValue
    // @grant        GM_getValue
    // @grant        GM_registerMenuCommand
    // ==/UserScript==
    ```


6. Easily switch between production version linked to GreasyFork and your local file.

**Note:** The script stores the OMDb API key using `GM_setValue`/`GM_getValue` and lets the user enter it via the Tampermonkey menu command (`GM_registerMenuCommand`). All three grants must be present in the userscript header (including the production one), otherwise the API key cannot be set.

## How to compile for production?
Run `npx webpack --mode="production"`
