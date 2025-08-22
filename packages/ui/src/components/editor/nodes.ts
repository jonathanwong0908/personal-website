import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "@workspace/ui/components/editor/nodes/image-node";
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical";
import { FigmaNode } from "./nodes/embeds/figma-node";
import { TweetNode } from "./nodes/embeds/tweet-node";
import { YouTubeNode } from "./nodes/embeds/youtube-node";

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    CodeNode,
    CodeHighlightNode,
    HorizontalRuleNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
    FigmaNode,
    TweetNode,
    YouTubeNode,
  ];
