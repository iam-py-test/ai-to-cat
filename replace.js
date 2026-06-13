// replace.js

/*
Originally copyright 2024, Zach Bellay.
Code derived from ai-to-butt by Zach Bellay, available at https://github.com/zachbellay/ai-to-butt
Licensed under the MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


function replaceText(node) {
    if (node.nodeType === 3) { // Text node
        let text = node.nodeValue;
        
        // Replace "AI" and "A.I." with "cat" but not partial matches
        text = text.replace(/\bAI\b/g, "cat");
        text = text.replace(/\bA\.I\./g, "cat");
        text = text.replace("artificial intelligence", "cat intelligence")
        text = text.replace("large language model", "large language meow")
        
        if (text !== node.nodeValue) {
            node.nodeValue = text;
        }
    } else if (node.nodeType === 1 && // Element node
               node.nodeName !== 'SCRIPT' && 
               node.nodeName !== 'STYLE' &&
               node.nodeName !== 'TEXTAREA' &&
               node.nodeName !== 'INPUT') {
        // Recursively process child nodes
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i]);
        }
    }
}

// Create a MutationObserver to handle dynamically added content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            replaceText(node);
        });
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial replacement
replaceText(document.body);
