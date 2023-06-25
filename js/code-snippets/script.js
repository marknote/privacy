"use strict"

const code = document.getElementById('code');
const form = document.getElementById('form');

const editor = {  
  updateCode: (value = '') => {
    const colorized = self.hljs.highlightAuto(value);
    code.innerHTML = colorized.value;
  }
}


function prepareThemeDropdown(val='github-dark') {
  const themes = ['a11y-dark','atom-one-dark','dark', 'github-dark','night-owl','nnfx-dark','rainbow','tomorrow-night-blue'];
  
  const dropdown = 
    document.getElementById('theme-dropdown');
    
  for(let theme of themes) {
    const opt = document.createElement('option');
    opt.value = theme;
    opt.innerText = theme;
    if (val === theme) {
      opt.selected = true;
    }
    dropdown.appendChild(opt);
  }
  dropdown.addEventListener('change',(event)=> {
    console.log('theme changed ' + event.target.value);
    const themeLink = document.getElementById('theme-link');
    themeLink.href = `lib/highlight/styles/${event.target.value}.min.css` ;
    
  });
}
window.onload = () => {
  prepareThemeDropdown('github-dark');
  const code2 = `
  window.onload = () => {
    const textarea = 
          document.getElementById('--------------------------------textarea')
    editor.updateCode(textarea.value)
    editor.resize(textarea.value)
  }
  `;
  const code = `
# Highlight.js CDN Assets

[![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

**This package contains only the CDN build assets of highlight.js.**

This may be what you want if you'd like to install the pre-built distributable highlight.js client-side assets via NPM. If you're wanting to use highlight.js mainly on the server-side you likely want the [highlight.js][1] package instead.

To access these files via CDN:<br>
https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/

**If you just want a single .js file with the common languages built-in:
<https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/highlight.min.js>**

---

## Highlight.js

`;
  editor.updateCode(code);
}
