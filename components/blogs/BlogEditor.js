import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/plugins.pkgd.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/showdown.min.js";
import "froala-editor/js/third_party/image_tui.min.js";
import "froala-editor/js/third_party/embedly.min.js";
import "froala-editor/js/third_party/font_awesome.min.js";
import "froala-editor/js/third_party/spell_checker.min.js";
import "froala-editor/js/languages/en_gb";
import { GoogleGenerativeAI } from "@google/generative-ai";
// ------------------------------------------------------------------------------------------------------------
// PublishPostPage Component
// ------------------------------------------------------------------------------------------------------------
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// ------------------------------------------------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------------------------------------------------

export default function BlogEditor({ content, setContent, onContentChange }) {
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const handleImageReplace = useCallback((img) => {
    if (img[0].hasAttribute("attachment-instanceid")) {
      img[0].removeAttribute("attachment-instanceid");
    }
  }, []);

  const [config] = useState(() => {
    return {
      editorClass: "ui attached segment text-editor",
      language: "en_gb",
      charCounterCount: false,
      attribution: false,
      events: {
        "image.replaced": handleImageReplace,
      },
      colorsText: [
        "#61BD6D",
        "#1ABC9C",
        "#54ACD2",
        "#2C82C9",
        "#e03997",
        "#475577",
        "#CCCCCC",
        "#41A85F",
        "#00A885",
        "#3D8EB9",
        "#2969B0",
        "#553982",
        "#28324E",
        "#000000",
        "#F7DA64",
        "#FBA026",
        "#EB6B56",
        "#E25041",
        "#A38F84",
        "#EFEFEF",
        "#FFFFFF",
        "#FAC51C",
        "#F37934",
        "#D14841",
        "#B8312F",
        "#7C706B",
        "#D1D5D8",
        "REMOVE",
      ],
      toolbarButtons: {
        moreText: {
          buttonsVisible: 30,
          buttons: [
            "bold",
            "italic",
            "paragraphFormat",
            "fontSize",
            "textColor",
            //'fontFamily',
            "lineHeight",
            "clearFormatting",
            //'inlineClass',
            "|",
            "alignLeft",
            "alignCenter",
            "alignRight",
            "alignJustify",
            "formatOL",
            "formatUL",
            "|",
            "insertLink",
            "insertImage",
            "insertVideo",
            "insertTable",
            "emoticons",
          ],
        },
        moreMisc: {
          buttonsVisible: 5,
          align: "right",
          buttons: ["undo", "redo", "fullscreen", "help", "html"],
        },
      },
      htmlAllowedAttrs: [
        "accept",
        "accept-charset",
        "accesskey",
        "action",
        "align",
        "allowfullscreen",
        "allowtransparency",
        "alt",
        "aria-.*",
        "async",
        "autocomplete",
        "autofocus",
        "autoplay",
        "autosave",
        "background",
        "bgcolor",
        "border",
        "charset",
        "cellpadding",
        "cellspacing",
        "checked",
        "cite",
        "class",
        "color",
        "cols",
        "colspan",
        "content",
        "contenteditable",
        "contextmenu",
        "controls",
        "coords",
        "data",
        "data-.*",
        "datetime",
        "default",
        "defer",
        "dir",
        "dirname",
        "disabled",
        "download",
        "draggable",
        "dropzone",
        "enctype",
        "for",
        "form",
        "formaction",
        "frameborder",
        "headers",
        "height",
        "hidden",
        "high",
        "href",
        "hreflang",
        "http-equiv",
        "icon",
        "id",
        "ismap",
        "itemprop",
        "keytype",
        "kind",
        "label",
        "lang",
        "language",
        "list",
        "loop",
        "low",
        "max",
        "maxlength",
        "media",
        "method",
        "min",
        "mozallowfullscreen",
        "multiple",
        "muted",
        "name",
        "novalidate",
        "open",
        "optimum",
        "pattern",
        "ping",
        "placeholder",
        "playsinline",
        "poster",
        "preload",
        "pubdate",
        "radiogroup",
        "readonly",
        "rel",
        "required",
        "reversed",
        "rows",
        "rowspan",
        "sandbox",
        "scope",
        "scoped",
        "scrolling",
        "seamless",
        "selected",
        "shape",
        "size",
        "sizes",
        "span",
        "src",
        "srcdoc",
        "srclang",
        "srcset",
        "start",
        "step",
        "summary",
        "spellcheck",
        "style",
        "tabindex",
        "target",
        "title",
        "type",
        "translate",
        "usemap",
        "value",
        "valign",
        "webkitallowfullscreen",
        "width",
        "wrap",
        "attachment-instanceid",
      ],
    };
  });

  const handleModelChange = useCallback(
    (model) => {
      setContent(model); // Update local state
      onContentChange && onContentChange(model); // Call external handler if provided
    },
    [setContent, onContentChange]
  );

  return (
    <FroalaEditorComponent
      model={content}
      config={config}
      onModelChange={handleModelChange}
    />
  );
}
