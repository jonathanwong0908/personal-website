import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CHECK_LIST, ELEMENT_TRANSFORMERS } from "@lexical/markdown";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

import { ContentEditable } from "@workspace/ui/components/editor/editor-ui/content-editable";
import { ComponentPickerMenuPlugin } from "@workspace/ui/components/editor/plugins/component-picker-menu-plugin";
import { ParagraphPickerPlugin } from "@workspace/ui/components/editor/plugins/picker/paragraph-picker-plugin";
import { HeadingPickerPlugin } from "@workspace/ui/components/editor/plugins/picker/heading-picker-plugin";
import { NumberedListPickerPlugin } from "@workspace/ui/components/editor/plugins/picker/numbered-list-picker-plugin";
import { BulletedListPickerPlugin } from "@workspace/ui/components/editor/plugins/picker/bulleted-list-picker-plugin";
import { QuotePickerPlugin } from "@workspace/ui/components/editor/plugins/picker/quote-picker-plugin";
import { CodePickerPlugin } from "@workspace/ui/components/editor/plugins/picker/code-picker-plugin";
import { DividerPickerPlugin } from "@workspace/ui/components/editor/plugins/picker/divider-picker-plugin";
import { HR } from "@workspace/ui/components/editor/transformers/markdown-hr-transformer";
import { ToolbarPlugin } from "@workspace/ui/components/editor/plugins/toolbar/toolbar-plugin";
import { HistoryToolbarPlugin } from "@workspace/ui/components/editor/plugins/toolbar/history-toolbar-plugin";
import { Separator } from "@workspace/ui/components/separator";
import { BlockFormatDropDown } from "@workspace/ui/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCodeBlock } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-code-block";
import { FormatQuote } from "@workspace/ui/components/editor/plugins/toolbar/block-format/format-quote";
import { CodeLanguageToolbarPlugin } from "@workspace/ui/components/editor/plugins/toolbar/code-language-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@workspace/ui/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { LinkToolbarPlugin } from "@workspace/ui/components/editor/plugins/toolbar/link-toolbar-plugin";
import { AutoLinkPlugin } from "@workspace/ui/components/editor/plugins/auto-link-plugin";
import { BlockInsertPlugin } from "@workspace/ui/components/editor/plugins/toolbar/block-insert-plugin";
import { InsertHorizontalRule } from "@workspace/ui/components/editor/plugins/toolbar/block-insert/insert-horizontal-rule";
import { InsertImage } from "@workspace/ui/components/editor/plugins/toolbar/block-insert/insert-image";
import { InsertEmbeds } from "@workspace/ui/components/editor/plugins/toolbar/block-insert/insert-embeds";
import { ImagesPlugin } from "./plugins/images-plugin";
import { AutoEmbedPlugin } from "@workspace/ui/components/editor/plugins/embeds/auto-embed-plugin";
import { FigmaPlugin } from "@workspace/ui/components/editor/plugins/embeds/figma-plugin";
import { TwitterPlugin } from "@workspace/ui/components/editor/plugins/embeds/twitter-plugin";
import { YouTubePlugin } from "@workspace/ui/components/editor/plugins/embeds/youtube-plugin";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative h-full min-h-full border">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="!h-7" />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCodeBlock />
              <FormatQuote />
            </BlockFormatDropDown>
            {blockType === "code" ? (
              <CodeLanguageToolbarPlugin />
            ) : (
              <>
                <FontFormatToolbarPlugin format="bold" />
                <FontFormatToolbarPlugin format="italic" />
                <FontFormatToolbarPlugin format="underline" />
                <FontFormatToolbarPlugin format="strikethrough" />
                <Separator orientation="vertical" className="!h-7" />
                <LinkToolbarPlugin />
                <Separator orientation="vertical" className="!h-7" />
                <BlockInsertPlugin>
                  <InsertHorizontalRule />
                  <InsertImage />
                  <InsertEmbeds />
                </BlockInsertPlugin>
              </>
            )}
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <HorizontalRulePlugin />
        <MarkdownShortcutPlugin
          transformers={[HR, CHECK_LIST, ...ELEMENT_TRANSFORMERS]}
        />
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <ImagesPlugin />
        <AutoEmbedPlugin />
        <FigmaPlugin />
        <TwitterPlugin />
        <YouTubePlugin />
        {/* editor plugins */}
        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            NumberedListPickerPlugin(),
            BulletedListPickerPlugin(),
            QuotePickerPlugin(),
            CodePickerPlugin(),
            DividerPickerPlugin(),
          ]}
        />
      </div>
      {/* actions plugins */}
    </div>
  );
}
