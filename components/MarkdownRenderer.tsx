"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Remove the h1 from markdown output because it's already in the page header
        h1: () => null,
        img: (props) => {
          let src = typeof props.src === 'string' ? props.src : '';
          
          if (src && !src.startsWith('http')) {
             // Strip leading slash if any
             const cleanSrc = src.startsWith('/') ? src.substring(1) : src;
             
             // Check if we need to prefix the GitHub pages repo name dynamically on the client
             const basePath = typeof window !== 'undefined' && window.location.pathname.includes('/mau-diary') ? '/mau-diary' : '';
             
             src = `${basePath}/${cleanSrc}`;
          }
          
          return (
            <span className="block my-8">
              <img 
                suppressHydrationWarning
                src={src} 
                alt={props.alt || ''} 

                title={props.title || ''} 
                className="w-full max-w-2xl mx-auto h-auto rounded-none border-4 border-[var(--color-mau-bg)] shadow-[0_0_0_2px_var(--color-mau-coffee-light)]" 
                loading="lazy" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackFired) {
                    target.dataset.fallbackFired = 'true';
                    // Check if we are hosted under /mau-diary (GitHub Pages)
                    const isGitHubPages = typeof window !== 'undefined' && window.location.pathname.includes('/mau-diary');
                    const basePath = isGitHubPages ? '/mau-diary' : '';
                    target.src = `${basePath}/assets/diary-covers/fallback-mau.png`;
                  }
                }}
              />

              {props.alt && (
                <span className="block text-center text-xs text-[var(--color-mau-text-muted)] mt-3 font-pixel tracking-widest uppercase">
                  {props.alt}
                </span>
              )}
            </span>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
